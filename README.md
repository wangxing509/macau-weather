# 澳門天氣 App（手机端）

基于澳門地球物理暨氣象局（SMG）**官方開放資料介面**的手机端天气应用，简约、友好、易用、生动。

- 实时天气：气温、体感、湿度、风、紫外线、天气警告
- 未来 7 日天气预报（高亮 8.19–8.24 出行关注）
- 实时空气质量指数（6 个官方监测站 + 今日空气质素预测）
- 月度气候历史（2025.01–2026.08，官方《气象观测月报》）+ 四季穿衣指数
- 8.19–8.24 逐日出行提醒
- **实时动态刷新**：每 5 分钟自动拉取 SMG 官方接口；支持下拉手势刷新
- **PWA**：可安装到手机主屏，离线快照回退

## 在 GitHub Pages 托管（免服务器）

### 方式一：直接推送（推荐，最简单）

1. 在 GitHub 新建一个仓库（例如 `macau-weather`，选 Public 或 Private 均可，Pages 需要 Public 或 Pro）；
2. 把本文件夹内**所有文件**（`index.html`、`manifest.webmanifest`、`sw.js`、`icons/`、`.github/`）推送到仓库根目录：
   ```bash
   git init
   git add .
   git commit -m "澳門天氣 App"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/<仓库名>.git
   git push -u origin main
   ```
3. 打开仓库 **Settings → Pages**：
   - Source 选 **Deploy from a branch**
   - Branch 选 **main**，目录选 **/ (root)**
   - Save 后等待 1–2 分钟，即可访问：
   `https://<你的用户名>.github.io/<仓库名>/`

### 方式二：GitHub Actions 自动部署

1. 按方式一推送代码（含 `.github/workflows/deploy-pages.yml`）；
2. 仓库 **Settings → Pages**：Source 选 **GitHub Actions**；
3. 之后每次 push 到 main 都会自动重新发布。

> 提示：也可以在仓库 Settings → Pages 里勾选 "Enforce HTTPS"（默认开启）。

## 本地预览

```bash
node server.js        # 或任意静态服务器，如 python -m http.server 8080
# 浏览器打开 http://localhost:8080
```

## 数据源（SMG 官方，浏览器直连，CORS 开放）

| 资料 | 接口 |
| --- | --- |
| 实况 + 7日预报 + 警告 + 紫外线 | `POST new-api.smg.gov.mo/weather_v2?selection=allweather&lang=c` |
| 实时空气质素指数 | `POST new-api.smg.gov.mo/weather_v2?selection=ho_api` |
| 今日空气质素预测 | `POST new-api.smg.gov.mo/weather_v2?selection=foreiqa&lang=c` |
| 月度观测 | SMG《气象观测月报》PDF（c_resumo_YYYYMM.pdf） |

## 说明

- 月度数据 2025.01–2026.06 为官方月报公布值；2026.07 月报待发布；2026.08 进行中。
- 8.23–8.24 预报待官方发布后自动显示（SMG 预报覆盖未来 7 日）。
- 本 App 为非官方应用，数据仅供参考，请以 SMG 最新发布为准。
