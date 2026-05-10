-- 方案 1: 允许匿名访问（仅用于开发和测试）
-- 如果你还没有启用用户认证系统，使用这个方案

-- 删除现有的策略（如果存在）
DROP POLICY IF EXISTS "Allow anonymous access" ON todos;

-- 创建允许所有操作的策略
CREATE POLICY "Enable all access for all users" ON todos
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- 验证策略是否创建成功
SELECT * FROM pg_policies WHERE tablename = 'todos';
