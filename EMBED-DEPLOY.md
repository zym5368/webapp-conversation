# 🚀 聊天应用嵌入式部署指南

这个指南将帮助你将基于 Dify 的聊天应用以嵌入式的方式部署到其他网站中。

## 📋 目录
- [部署方式](#部署方式)
- [环境配置](#环境配置)
- [本地开发](#本地开发)
- [生产部署](#生产部署)
- [嵌入使用](#嵌入使用)
- [高级配置](#高级配置)
- [故障排除](#故障排除)

## 🎯 部署方式

### 方式一：使用 JavaScript SDK（推荐）
通过加载 JavaScript SDK，在任何网站中轻松嵌入聊天组件。

### 方式二：直接 iframe 嵌入
简单直接的 iframe 方式，适合快速集成。

## ⚙️ 环境配置

### 1. 创建环境配置文件
复制 `.env.example` 为 `.env.local` 并配置：

```env
# Dify应用ID（从应用详情页面URL获取）
NEXT_PUBLIC_APP_ID=your_app_id

# Dify API密钥（从应用的"API访问"页面生成）
NEXT_PUBLIC_APP_KEY=your_api_key

# Dify API基础URL
NEXT_PUBLIC_API_URL=https://api.dify.ai/v1
```

### 2. 应用配置
编辑 `config/index.ts` 文件：

```typescript
export const APP_INFO: AppInfo = {
  title: '你的聊天应用名称',
  description: '应用描述',
  copyright: '版权信息',
  privacy_policy: '隐私政策链接',
  default_language: 'zh-Hans', // 或 'en'
}

export const isShowPrompt = false // 是否显示提示
export const promptTemplate = '你的提示模板'
```

## 🛠️ 本地开发

### 安装依赖
```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 启动开发服务器
```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

### 测试嵌入页面
访问以下地址测试：
- 主页面：http://localhost:3000
- 嵌入页面：http://localhost:3000/embed
- 示例页面：http://localhost:3000/embed-example.html

## 🚀 生产部署

### 方式一：使用 Docker（推荐）

1. **构建 Docker 镜像**
```bash
docker build . -t your-chat-app:latest
```

2. **运行容器**
```bash
docker run -d \
  --name chat-app \
  -p 3000:3000 \
  -e NEXT_PUBLIC_APP_ID="your_app_id" \
  -e NEXT_PUBLIC_APP_KEY="your_api_key" \
  -e NEXT_PUBLIC_API_URL="https://api.dify.ai/v1" \
  your-chat-app:latest
```

### 方式二：传统部署

1. **构建应用**
```bash
npm run build
```

2. **启动应用**
```bash
npm start
```

### 方式三：部署到 Vercel

1. **推送代码到 GitHub**
2. **连接 Vercel 到你的仓库**
3. **在 Vercel 设置环境变量**
4. **部署完成**

> ⚠️ 注意：如果使用 Vercel Hobby 计划，消息可能会因为限制而被截断。

## 🔗 嵌入使用

### JavaScript SDK 方式

在目标网站的 HTML 中添加：

```html
<!-- 配置聊天组件 -->
<script>
  window.chatWidgetConfig = {
    baseUrl: 'https://your-domain.com', // 你的应用域名
    width: '400px',
    height: '600px',
    position: 'bottom-right', // bottom-right, bottom-left, center
    showButton: true,
    buttonText: '💬',
    autoLoad: true
  };
</script>
<script src="https://your-domain.com/embed-sdk.js"></script>
```

### iframe 方式

```html
<iframe 
  src="https://your-domain.com/embed" 
  width="400" 
  height="600" 
  frameborder="0"
  style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
</iframe>
```

### 编程式控制

```javascript
// 创建聊天组件实例
const chatWidget = new ChatWidget({
  baseUrl: 'https://your-domain.com',
  width: '400px',
  height: '600px',
  position: 'bottom-right'
});

// 打开聊天窗口
chatWidget.open();

// 关闭聊天窗口
chatWidget.close();

// 切换显示状态
chatWidget.toggle();

// 销毁组件
chatWidget.destroy();
```

## ⚙️ 高级配置

### 自定义样式
可以通过 CSS 覆盖默认样式：

```css
/* 自定义聊天按钮样式 */
.chat-widget-button {
  background: #your-color !important;
  border-radius: 10px !important;
}

/* 自定义聊天窗口样式 */
.chat-widget-iframe {
  border: 2px solid #your-color !important;
}
```

### 域名白名单配置
修改 `next.config.js` 中的 CSP 策略：

```javascript
{
  key: 'Content-Security-Policy',
  value: "frame-ancestors 'self' https://trusted-domain.com", // 限制特定域名
},
```

### 响应式设计
SDK 支持响应式配置：

```javascript
window.chatWidgetConfig = {
  baseUrl: 'https://your-domain.com',
  width: window.innerWidth < 768 ? '100%' : '400px',
  height: window.innerWidth < 768 ? '100%' : '600px',
  position: window.innerWidth < 768 ? 'center' : 'bottom-right'
};
```

## 🔧 故障排除

### 常见问题

1. **iframe 无法加载**
   - 检查 `X-Frame-Options` 配置
   - 确认域名是否在允许列表中

2. **API 请求失败**
   - 验证环境变量配置
   - 检查 Dify API 密钥是否正确
   - 确认网络连接正常

3. **样式显示异常**
   - 检查 CSS 冲突
   - 确认 z-index 设置

4. **跨域问题**
   - 配置正确的 CORS 策略
   - 检查 CSP 头部设置

### 调试技巧

1. **开启浏览器开发者工具**
   - 查看 Console 错误信息
   - 检查 Network 请求状态

2. **查看应用日志**
```bash
# Docker 容器日志
docker logs chat-app

# 本地开发日志
npm run dev
```

## 📞 支持

如果遇到问题：
1. 查看本文档的故障排除章节
2. 检查项目的 GitHub Issues
3. 联系技术支持

---

## 📝 更新日志

- **v1.0.0**: 初始版本，支持基础嵌入功能
- **v1.1.0**: 添加 JavaScript SDK
- **v1.2.0**: 增加响应式支持和自定义样式 
