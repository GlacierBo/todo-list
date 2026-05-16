"""
图片下载脚本
用法: python scripts/download-images.py <URL> [URL ...]
      python scripts/download-images.py -f urls.txt
      python scripts/download-images.py --all
      python scripts/download-images.py --webp <URL>    # 下载后自动转 WebP
      python scripts/download-images.py --rename <URL>  # 下载后重命名为 年月日-3位随机-流水号

下载到 docs/external/ 目录，自动跳过已存在的文件。
"""

import os
import sys
import re
import random
import urllib.request
import urllib.error
import urllib.parse
import ssl
from pathlib import Path
from datetime import date

try:
    from PIL import Image
except ImportError:
    print("需要 Pillow 库: pip install Pillow")
    sys.exit(1)

DOWNLOAD_DIR = Path("docs/external")
DOWNLOAD_DIR.mkdir(parents=True, exist_ok=True)

ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

WEBP_QUALITY = 80

# 重命名格式: 20260516-192-00001.ext
DATE_STR = date.today().strftime("%Y%m%d")
DATE_RAND = f"{random.randint(0, 999):03d}"
RENAME_RE = re.compile(r"^\d{8}-\d{3}-\d{5}\..+$")


def download(url: str) -> Path | None:
    """下载图片到本地，返回文件路径，失败返回 None"""
    parsed = urllib.parse.urlparse(url)
    filename = os.path.basename(parsed.path)
    if not filename:
        print(f"  !! 无法从 URL 提取文件名: {url}")
        return None

    dest = DOWNLOAD_DIR / filename
    if dest.exists():
        print(f"  -> 已存在，跳过下载: {filename}")
        return dest

    print(f"  .. 下载: {filename}")
    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        })
        with urllib.request.urlopen(req, context=ssl_ctx, timeout=30) as resp:
            data = resp.read()
        dest.write_bytes(data)
        print(f"  OK 完成: {filename} ({len(data) / 1024:.1f} KB)")
        return dest
    except Exception as e:
        print(f"  FAIL: {filename} - {e}")
        return None


def convert_to_webp(path: Path) -> Path | None:
    """将图片转为 WebP，删除原文件，返回最终文件路径"""
    if path.suffix.lower() in (".webp",):
        print(f"  -> 已是 WebP，跳过转换: {path.name}")
        return path

    webp_path = path.with_suffix(".webp")
    if webp_path.exists():
        print(f"  -> WebP 已存在，删除原文件: {path.name}")
        path.unlink()
        return webp_path

    print(f"  .. 转换: {path.name} -> {webp_path.name}")
    try:
        img = Image.open(path)
        img.save(webp_path, "WEBP", quality=WEBP_QUALITY)

        old_size = path.stat().st_size
        new_size = webp_path.stat().st_size
        ratio = (old_size - new_size) / old_size * 100

        if new_size < old_size:
            path.unlink()
            print(f"  OK WebP: {webp_path.name} ({new_size / 1024:.1f} KB, {ratio:+.1f}%)")
            return webp_path
        else:
            webp_path.unlink()
            print(f"  -> 保留原文件: {path.name} (WebP {new_size / 1024:.1f}KB >= {old_size / 1024:.1f}KB)")
            return path
    except Exception as e:
        print(f"  FAIL 转换: {path.name} - {e}")
        return path


def rename_files(files_to_rename: list[Path]) -> dict[str, str]:
    """批量重命名文件为 YYYYMMDD-RRR-SSSSS.ext，返回 {旧名: 新名} 映射"""
    # 找到已存在文件中的最大流水号
    existing_re = re.compile(rf"^{DATE_STR}-\d{{3}}-(\d{{5}})\..+")
    max_seq = 0
    for f in DOWNLOAD_DIR.iterdir():
        m = existing_re.match(f.name)
        if m:
            max_seq = max(max_seq, int(m.group(1)))

    seq = max_seq + 1
    rename_map = {}
    for f in sorted(files_to_rename, key=lambda p: p.name):
        new_name = f"{DATE_STR}-{DATE_RAND}-{seq:05d}{f.suffix}"
        f.rename(DOWNLOAD_DIR / new_name)
        rename_map[f.name] = new_name
        seq += 1
    return rename_map


def update_markdown_refs(rename_map: dict[str, str]):
    """更新 Markdown 文件中的图片引用"""
    updated = 0
    for md_file in Path("docs").rglob("*.md"):
        content = md_file.read_text(encoding="utf-8")
        new_content = content
        for old_name, new_name in rename_map.items():
            new_content = new_content.replace(f"external/{old_name}", f"external/{new_name}")
        if new_content != content:
            md_file.write_text(new_content, encoding="utf-8")
            updated += 1
    if updated:
        print(f"\n  更新了 {updated} 个 Markdown 文件的引用")


def extract_urls_from_markdown(md_dir: str = "docs") -> list[str]:
    """从 markdown 文件中提取所有外部图片 URL"""
    urls = set()
    pattern = re.compile(r"\]\((https?://[^)]+\.(png|jpg|jpeg|gif|webp)[^)]*)\)")
    for md_file in Path(md_dir).rglob("*.md"):
        content = md_file.read_text(encoding="utf-8")
        for m in pattern.finditer(content):
            url = m.group(1).split(" ")[0]
            urls.add(url)
    return sorted(urls)


def main():
    targets = []
    do_webp = False
    do_rename = False

    args = sys.argv[1:]
    if "--webp" in args:
        do_webp = True
        args.remove("--webp")
    if "--rename" in args:
        do_rename = True
        args.remove("--rename")

    if not args:
        print("用法:")
        print("  python scripts/download-images.py <URL> [URL ...]")
        print("  python scripts/download-images.py -f <urls.txt>")
        print("  python scripts/download-images.py --all")
        print("  python scripts/download-images.py --webp <URL>    # 下载后转 WebP")
        print("  python scripts/download-images.py --rename <URL>  # 下载后重命名")
        print("  python scripts/download-images.py --webp --rename <URL>  # 下载+转WebP+重命名")
        sys.exit(1)

    if args[0] == "--all":
        targets = extract_urls_from_markdown()
        print(f"从 Markdown 中提取到 {len(targets)} 个外部图片")
    elif args[0] == "-f" and len(args) > 1:
        txt = Path(args[1])
        targets = [line.strip() for line in txt.read_text().splitlines() if line.strip()]
        print(f"从文件读取到 {len(targets)} 个 URL")
    else:
        targets = [a for a in args if not a.startswith("--")]

    # 记录处理前的文件列表
    existing_before = {f.name for f in DOWNLOAD_DIR.iterdir() if f.is_file()}

    # 下载 + 可选转 WebP
    new_files = []
    for url in targets:
        print(f"\n处理: {url}")
        path = download(url)
        if path:
            if do_webp:
                path = convert_to_webp(path)
            new_files.append(path)

    if not new_files:
        print("\n没有新下载的文件")
        return

    print(f"\n--- 下载完成: {len(new_files)} 个文件 ---")

    # 可选重命名
    if do_rename:
        # 只重命名本次新下载的文件（跳过已按格式命名的和隐藏文件）
        to_rename = [f for f in new_files if not RENAME_RE.match(f.name)]
        if to_rename:
            rename_map = rename_files(to_rename)
            print(f"\n重命名 {len(rename_map)} 个文件:")
            for old, new in rename_map.items():
                print(f"  {old} -> {new}")
            update_markdown_refs(rename_map)
            # 用新名字更新结果列表
            final_map = {str(f): rename_map.get(f.name, f.name) for f in new_files}
            final_names = [final_map.get(str(f), f.name) for f in new_files]
        else:
            print("\n所有文件已符合命名规范，无需重命名")
            final_names = [f.name for f in new_files]
    else:
        final_names = [f.name for f in new_files]

    print(f"\n--- 总结: {len(final_names)} 个文件 ---")
    for url, name in zip(targets[:len(final_names)], final_names):
        print(f"  {url}")
        print(f"    -> docs/external/{name}")


if __name__ == "__main__":
    main()
