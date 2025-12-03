# Lottie 动画卡片组件

## 简介

成功将 `framer-fveypm-container` 模块从原网站迁移到 Next.js 项目，使用 Lottie 动画引擎实现动态效果。

## 使用方法

### 基础用法

```tsx
import LottieCard from "./components/LottieCard";

<LottieCard
  badge="For Issuers"
  title="Complete ecosystems for tokenized assets"
  description="Tap into onchain markets with an institutional-grade tokenization stack."
  animationPath="/iAtwaAlMxMiMYxB3HyEPbkDjx0.json"
/>
```

### 参数说明

- `badge`: 徽章文本（例如："For Issuers"）
- `title`: 卡片标题
- `description`: 卡片描述
- `animationPath`: Lottie JSON 文件路径（可选）
- `className`: 额外的 CSS 类名（可选）

## 可用动画文件

项目 `public/` 目录中包含以下 Lottie 动画文件：

1. `iAtwaAlMxMiMYxB3HyEPbkDjx0.json`
2. `iGbdwc03WgC0FEfcd59IJdnhUkI.json`
3. `KBgd1luvWIPR43iwbHqMrXiqWfs.json`
4. `sxp5vYoSaPggBtOydnITFu0QUSw.json`
5. `y4pqnWsvyGi4Yodhdz75DPx5IqQ.json`

## 特性

✅ 自动加载 Lottie 库（CDN）  
✅ 循环播放动画  
✅ 响应式设计  
✅ 备用装饰圆圈（动画加载失败时显示）  
✅ 自动内存清理  

## 示例

```tsx
<div className="grid md:grid-cols-2 gap-8">
  <LottieCard
    badge="For Issuers"
    title="Complete ecosystems for tokenized assets"
    description="Tap into onchain markets with an institutional-grade tokenization stack."
    animationPath="/iAtwaAlMxMiMYxB3HyEPbkDjx0.json"
  />
  
  <LottieCard
    badge="For Allocators"
    title="Access institutional-grade products"
    description="Deploy capital efficiently across tokenized assets."
    animationPath="/iGbdwc03WgC0FEfcd59IJdnhUkI.json"
  />
</div>
```

## 技术实现

- **Lottie Web**: 矢量动画播放引擎
- **React Hooks**: 管理动画生命周期
- **Tailwind CSS**: 样式和布局
- **动态加载**: CDN 按需加载 Lottie 库

## 注意事项

1. 动画文件需放在 `public/` 目录
2. 组件会自动处理 Lottie 库的加载
3. 如果动画加载失败，会显示静态装饰圆圈
4. 组件卸载时会自动清理动画实例
