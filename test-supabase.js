import { createClient } from '@supabase/supabase-js'

// 从环境变量读取配置
const supabaseUrl = 'https://ukzdmudgsxvgteuaxdxw.supabase.co'
const supabaseKey = 'sb_publishable_r5rS7ona9DcTteFHhiQwwg_PfRQ7vx_'

console.log('🔍 开始测试 Supabase 连接...\n')
console.log('URL:', supabaseUrl)
console.log('Key:', supabaseKey ? '✓ 已配置' : '✗ 未配置')
console.log()

// 创建客户端
const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  try {
    // 测试 1: 检查客户端是否创建成功
    console.log('✅ 步骤 1: Supabase 客户端创建成功\n')

    // 测试 2: 尝试查询 todos 表
    console.log('📊 步骤 2: 查询 todos 表...')
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .limit(5)

    if (error) {
      console.error('❌ 查询失败:', error.message)
      console.error('错误详情:', error)
      return
    }

    console.log('✅ 查询成功!')
    console.log(`找到 ${data?.length || 0} 条记录`)
    
    if (data && data.length > 0) {
      console.log('\n📝 示例数据:')
      data.forEach((todo, index) => {
        console.log(`  ${index + 1}. ${todo.title} (${todo.completed ? '已完成' : '未完成'})`)
      })
    } else {
      console.log('\n⚠️  表中暂无数据，可以添加一些测试数据')
    }

    // 测试 3: 尝试插入一条测试数据
    console.log('\n📝 步骤 3: 尝试插入测试数据...')
    const testTodo = {
      title: '测试任务 - ' + new Date().toLocaleTimeString(),
      description: '这是一条自动创建的测试任务',
      completed: false,
      priority: 1
    }

    const { data: insertedData, error: insertError } = await supabase
      .from('todos')
      .insert([testTodo])
      .select()
      .single()

    if (insertError) {
      console.error('❌ 插入失败:', insertError.message)
      console.error('错误详情:', insertError)
      return
    }

    console.log('✅ 插入成功!')
    console.log('新任务 ID:', insertedData.id)
    console.log('任务标题:', insertedData.title)

    // 测试 4: 验证数据已插入
    console.log('\n🔍 步骤 4: 验证数据...')
    const { data: verifyData } = await supabase
      .from('todos')
      .select('*')
      .eq('id', insertedData.id)
      .single()

    if (verifyData) {
      console.log('✅ 数据验证成功!')
      console.log('数据库中的任务:', verifyData.title)
    }

    console.log('\n🎉 所有测试通过！Supabase 连接正常！')
    console.log('\n💡 提示: 现在可以运行 npm run dev 启动开发服务器')

  } catch (err) {
    console.error('\n❌ 测试过程中发生错误:')
    console.error(err)
  }
}

// 执行测试
testConnection()
