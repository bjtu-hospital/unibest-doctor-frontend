// vite.config.ts
import path4 from "node:path";
import process4 from "node:process";
import Uni from "file:///C:/Users/fengyiiiii/Desktop/unibest-doctor-frontend/node_modules/.pnpm/@uni-helper+plugin-uni@0.1._a5da5ce589b3baa190af3f29755e9dba/node_modules/@uni-helper/plugin-uni/src/index.js";
import Components from "file:///C:/Users/fengyiiiii/Desktop/unibest-doctor-frontend/node_modules/.pnpm/@uni-helper+vite-plugin-uni-components@0.2.3_rollup@4.50.0/node_modules/@uni-helper/vite-plugin-uni-components/dist/index.mjs";
import UniLayouts from "file:///C:/Users/fengyiiiii/Desktop/unibest-doctor-frontend/node_modules/.pnpm/@uni-helper+vite-plugin-uni-layouts@0.1.11_rollup@4.50.0/node_modules/@uni-helper/vite-plugin-uni-layouts/dist/index.mjs";
import UniManifest from "file:///C:/Users/fengyiiiii/Desktop/unibest-doctor-frontend/node_modules/.pnpm/@uni-helper+vite-plugin-uni_fafb499a6c7148eb9f0b6edf3e80e6e8/node_modules/@uni-helper/vite-plugin-uni-manifest/dist/index.mjs";
import UniPages from "file:///C:/Users/fengyiiiii/Desktop/unibest-doctor-frontend/node_modules/.pnpm/@uni-helper+vite-plugin-uni_e52ea90dc678554206499b68a7e7c4f5/node_modules/@uni-helper/vite-plugin-uni-pages/dist/index.mjs";
import UniPlatform from "file:///C:/Users/fengyiiiii/Desktop/unibest-doctor-frontend/node_modules/.pnpm/@uni-helper+vite-plugin-uni-platform@0.0.5/node_modules/@uni-helper/vite-plugin-uni-platform/dist/index.mjs";
import Optimization from "file:///C:/Users/fengyiiiii/Desktop/unibest-doctor-frontend/node_modules/.pnpm/@uni-ku+bundle-optimizer@1._53b0973a91f876a19b3a499e43ca5442/node_modules/@uni-ku/bundle-optimizer/dist/index.mjs";
import UniKuRoot from "file:///C:/Users/fengyiiiii/Desktop/unibest-doctor-frontend/node_modules/.pnpm/@uni-ku+root@1.4.1_vite@5.2_c0ded3f42c86f74e44565dc29de27a4c/node_modules/@uni-ku/root/dist/index.mjs";
import dayjs from "file:///C:/Users/fengyiiiii/Desktop/unibest-doctor-frontend/node_modules/.pnpm/dayjs@1.11.10/node_modules/dayjs/dayjs.min.js";
import { visualizer } from "file:///C:/Users/fengyiiiii/Desktop/unibest-doctor-frontend/node_modules/.pnpm/rollup-plugin-visualizer@6.0.3_rollup@4.50.0/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import UnoCSS from "file:///C:/Users/fengyiiiii/Desktop/unibest-doctor-frontend/node_modules/.pnpm/unocss@66.0.0_postcss@8.5.6_2ea57284233e93f4ec422395ed46624f/node_modules/unocss/dist/vite.mjs";
import AutoImport from "file:///C:/Users/fengyiiiii/Desktop/unibest-doctor-frontend/node_modules/.pnpm/unplugin-auto-import@20.1.0/node_modules/unplugin-auto-import/dist/vite.js";
import { defineConfig, loadEnv } from "file:///C:/Users/fengyiiiii/Desktop/unibest-doctor-frontend/node_modules/.pnpm/vite@5.2.8_@types+node@20.19.11_sass@1.77.8_terser@5.43.1/node_modules/vite/dist/node/index.js";
import ViteRestart from "file:///C:/Users/fengyiiiii/Desktop/unibest-doctor-frontend/node_modules/.pnpm/vite-plugin-restart@1.0.0_v_0b7ac2f9a82bf6364aa0d69f22d0869d/node_modules/vite-plugin-restart/dist/index.js";

// scripts/open-dev-tools.js
import { exec } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
function _openDevTools() {
  const platform = process.platform;
  const { UNI_PLATFORM } = process.env;
  const uniPlatformText = UNI_PLATFORM === "mp-weixin" ? "\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F" : UNI_PLATFORM === "mp-alipay" ? "\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F" : "\u5C0F\u7A0B\u5E8F";
  const projectPath = path.resolve(process.cwd(), `dist/dev/${UNI_PLATFORM}`);
  if (!fs.existsSync(projectPath)) {
    console.log(`\u274C ${uniPlatformText}\u6784\u5EFA\u76EE\u5F55\u4E0D\u5B58\u5728:`, projectPath);
    return;
  }
  console.log(`\u{1F680} \u6B63\u5728\u6253\u5F00${uniPlatformText}\u5F00\u53D1\u8005\u5DE5\u5177...`);
  let command = "";
  if (platform === "darwin") {
    if (UNI_PLATFORM === "mp-weixin") {
      command = `/Applications/wechatwebdevtools.app/Contents/MacOS/cli -o "${projectPath}"`;
    } else if (UNI_PLATFORM === "mp-alipay") {
      command = `/Applications/\u5C0F\u7A0B\u5E8F\u5F00\u53D1\u8005\u5DE5\u5177.app/Contents/MacOS/\u5C0F\u7A0B\u5E8F\u5F00\u53D1\u8005\u5DE5\u5177 --p "${projectPath}"`;
    }
  } else if (platform === "win32" || platform === "win64") {
    if (UNI_PLATFORM === "mp-weixin") {
      command = `"C:\\Program Files (x86)\\Tencent\\\u5FAE\u4FE1web\u5F00\u53D1\u8005\u5DE5\u5177\\cli.bat" -o "${projectPath}"`;
    }
  } else {
    console.log("\u274C \u5F53\u524D\u7CFB\u7EDF\u4E0D\u652F\u6301\u81EA\u52A8\u6253\u5F00\u5FAE\u4FE1\u5F00\u53D1\u8005\u5DE5\u5177");
    return;
  }
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`\u274C \u6253\u5F00${uniPlatformText}\u5F00\u53D1\u8005\u5DE5\u5177\u5931\u8D25:`, error.message);
      console.log(`\u{1F4A1} \u8BF7\u786E\u4FDD${uniPlatformText}\u5F00\u53D1\u8005\u5DE5\u5177\u670D\u52A1\u7AEF\u53E3\u5DF2\u542F\u7528`);
      console.log(`\u{1F4A1} \u53EF\u4EE5\u624B\u52A8\u6253\u5F00${uniPlatformText}\u5F00\u53D1\u8005\u5DE5\u5177\u5E76\u5BFC\u5165\u9879\u76EE:`, projectPath);
      return;
    }
    if (stderr) {
      console.log("\u26A0\uFE0F \u8B66\u544A:", stderr);
    }
    console.log(`\u2705 ${uniPlatformText}\u5F00\u53D1\u8005\u5DE5\u5177\u5DF2\u6253\u5F00`);
    if (stdout) {
      console.log(stdout);
    }
  });
}
function openDevTools() {
  let isFirstBuild = true;
  return {
    name: "uni-devtools",
    writeBundle() {
      if (isFirstBuild && process.env.UNI_PLATFORM?.includes("mp")) {
        isFirstBuild = false;
        _openDevTools();
      }
    }
  };
}

// vite-plugins/copy-native-resources.ts
import path2 from "node:path";
import process2 from "node:process";
import fs2 from "file:///C:/Users/fengyiiiii/Desktop/unibest-doctor-frontend/node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/index.js";
var DEFAULT_OPTIONS = {
  enable: true,
  sourceDir: "nativeplugins",
  targetDirName: "nativeplugins",
  verbose: true,
  logPrefix: "[copy-native-resources]"
};
function copyNativeResources(options = {}) {
  const config = { ...DEFAULT_OPTIONS, ...options };
  if (!config.enable) {
    return {
      name: "copy-native-resources-disabled",
      apply: "build",
      writeBundle() {
      }
    };
  }
  return {
    name: "copy-native-resources",
    apply: "build",
    // 只在构建时应用
    enforce: "post",
    // 在其他插件执行完毕后执行
    async writeBundle() {
      const { sourceDir, targetDirName, verbose, logPrefix } = config;
      try {
        const projectRoot = process2.cwd();
        const sourcePath = path2.resolve(projectRoot, sourceDir);
        const buildMode = process2.env.NODE_ENV === "production" ? "build" : "dev";
        const platform = process2.env.UNI_PLATFORM || "app";
        const targetPath = path2.resolve(
          projectRoot,
          "dist",
          buildMode,
          platform,
          targetDirName
        );
        const sourceExists = await fs2.pathExists(sourcePath);
        if (!sourceExists) {
          if (verbose) {
            console.warn(`${logPrefix} \u6E90\u76EE\u5F55\u4E0D\u5B58\u5728\uFF0C\u8DF3\u8FC7\u590D\u5236\u64CD\u4F5C`);
            console.warn(`${logPrefix} \u6E90\u76EE\u5F55\u8DEF\u5F84: ${sourcePath}`);
            console.warn(`${logPrefix} \u5982\u9700\u4F7F\u7528\u672C\u5730\u539F\u751F\u63D2\u4EF6\uFF0C\u8BF7\u5728\u9879\u76EE\u6839\u76EE\u5F55\u521B\u5EFA nativeplugins \u76EE\u5F55`);
            console.warn(`${logPrefix} \u5E76\u6309\u7167\u5B98\u65B9\u6587\u6863\u653E\u5165\u539F\u751F\u63D2\u4EF6\u6587\u4EF6`);
            console.warn(`${logPrefix} \u53C2\u8003: https://uniapp.dcloud.net.cn/plugin/native-plugin.html`);
          }
          return;
        }
        const sourceFiles = await fs2.readdir(sourcePath);
        if (sourceFiles.length === 0) {
          if (verbose) {
            console.warn(`${logPrefix} \u6E90\u76EE\u5F55\u4E3A\u7A7A\uFF0C\u8DF3\u8FC7\u590D\u5236\u64CD\u4F5C`);
            console.warn(`${logPrefix} \u6E90\u76EE\u5F55\u8DEF\u5F84: ${sourcePath}`);
            console.warn(`${logPrefix} \u8BF7\u5728 nativeplugins \u76EE\u5F55\u4E2D\u653E\u5165\u539F\u751F\u63D2\u4EF6\u6587\u4EF6`);
          }
          return;
        }
        await fs2.ensureDir(targetPath);
        if (verbose) {
          console.log(`${logPrefix} \u5F00\u59CB\u590D\u5236 UniApp \u672C\u5730\u539F\u751F\u63D2\u4EF6...`);
          console.log(`${logPrefix} \u6E90\u76EE\u5F55: ${sourcePath}`);
          console.log(`${logPrefix} \u76EE\u6807\u76EE\u5F55: ${targetPath}`);
          console.log(`${logPrefix} \u6784\u5EFA\u6A21\u5F0F: ${buildMode}`);
          console.log(`${logPrefix} \u76EE\u6807\u5E73\u53F0: ${platform}`);
          console.log(`${logPrefix} \u53D1\u73B0 ${sourceFiles.length} \u4E2A\u539F\u751F\u63D2\u4EF6\u6587\u4EF6/\u76EE\u5F55`);
        }
        await fs2.copy(sourcePath, targetPath, {
          overwrite: true,
          // 覆盖已存在的文件，确保使用最新版本
          errorOnExist: false,
          // 如果目标文件存在不报错
          preserveTimestamps: true
          // 保持文件的时间戳
        });
        if (verbose) {
          console.log(`${logPrefix} \u2705 UniApp \u672C\u5730\u539F\u751F\u63D2\u4EF6\u590D\u5236\u5B8C\u6210`);
          console.log(`${logPrefix} \u5DF2\u6210\u529F\u590D\u5236 ${sourceFiles.length} \u4E2A\u6587\u4EF6/\u76EE\u5F55\u5230\u6784\u5EFA\u76EE\u5F55`);
          console.log(`${logPrefix} \u539F\u751F\u63D2\u4EF6\u73B0\u5728\u53EF\u4EE5\u5728 App \u4E2D\u6B63\u5E38\u4F7F\u7528`);
        }
      } catch (error) {
        console.error(`${config.logPrefix} \u274C \u590D\u5236 UniApp \u672C\u5730\u539F\u751F\u63D2\u4EF6\u5931\u8D25:`, error);
        console.error(`${config.logPrefix} \u9519\u8BEF\u8BE6\u60C5:`, error instanceof Error ? error.message : String(error));
        console.error(`${config.logPrefix} \u8BF7\u68C0\u67E5\u6E90\u76EE\u5F55\u6743\u9650\u548C\u78C1\u76D8\u7A7A\u95F4`);
      }
    }
  };
}
function createCopyNativeResourcesPlugin(enable = true, options = {}) {
  return copyNativeResources({ enable, ...options });
}

// vite-plugins/sync-manifest-plugins.ts
import fs3 from "node:fs";
import path3 from "node:path";
import process3 from "node:process";
function syncManifestPlugin() {
  return {
    name: "sync-manifest",
    apply: "build",
    enforce: "post",
    writeBundle: {
      order: "post",
      handler() {
        const srcManifestPath = path3.resolve(process3.cwd(), "./src/manifest.json");
        const distAppPath = path3.resolve(process3.cwd(), "./dist/dev/app/manifest.json");
        try {
          const srcManifest = JSON.parse(fs3.readFileSync(srcManifestPath, "utf8"));
          const distAppDir = path3.dirname(distAppPath);
          if (!fs3.existsSync(distAppDir)) {
            fs3.mkdirSync(distAppDir, { recursive: true });
          }
          let distManifest = {};
          if (fs3.existsSync(distAppPath)) {
            distManifest = JSON.parse(fs3.readFileSync(distAppPath, "utf8"));
          }
          if (srcManifest["app-plus"]?.distribute?.plugins) {
            if (!distManifest.plus)
              distManifest.plus = {};
            if (!distManifest.plus.distribute)
              distManifest.plus.distribute = {};
            distManifest.plus.distribute.plugins = srcManifest["app-plus"].distribute.plugins;
            fs3.writeFileSync(distAppPath, JSON.stringify(distManifest, null, 2));
            console.log("\u2705 Manifest plugins \u540C\u6B65\u6210\u529F");
          }
        } catch (error) {
          console.error("\u274C \u540C\u6B65 manifest plugins \u5931\u8D25:", error);
        }
      }
    }
  };
}

// vite.config.ts
var vite_config_default = defineConfig(({ command, mode }) => {
  console.log("command, mode -> ", command, mode);
  const { UNI_PLATFORM } = process4.env;
  console.log("UNI_PLATFORM -> ", UNI_PLATFORM);
  const env = loadEnv(mode, path4.resolve(process4.cwd(), "env"));
  const {
    VITE_APP_PORT,
    VITE_SERVER_BASEURL,
    VITE_APP_TITLE,
    VITE_DELETE_CONSOLE,
    VITE_APP_PUBLIC_BASE,
    VITE_APP_PROXY_ENABLE,
    VITE_APP_PROXY_PREFIX,
    VITE_COPY_NATIVE_RES_ENABLE
  } = env;
  console.log("\u73AF\u5883\u53D8\u91CF env -> ", env);
  return defineConfig({
    envDir: "./env",
    // 自定义env目录
    base: VITE_APP_PUBLIC_BASE,
    plugins: [
      UniLayouts(),
      UniPlatform(),
      UniManifest(),
      UniPages({
        exclude: ["**/components/**/**.*"],
        // pages 目录为 src/pages，分包目录不能配置在pages目录下！！
        // 是个数组，可以配置多个，但是不能为pages里面的目录！！
        subPackages: [
          "src/pages-fg"
          // 这个是相对必要的路由，尽量留着（登录页、注册页、404页等）
        ],
        dts: "src/types/uni-pages.d.ts"
      }),
      // Optimization 插件需要 page.json 文件，故应在 UniPages 插件之后执行
      Optimization({
        enable: {
          "optimization": true,
          "async-import": true,
          "async-component": true
        },
        dts: {
          base: "src/types"
        },
        logger: false
      }),
      // UniXXX 需要在 Uni 之前引入
      // 若存在改变 pages.json 的插件，请将 UniKuRoot 放置其后
      UniKuRoot({
        excludePages: ["**/components/**/**.*"]
      }),
      Uni(),
      {
        // 临时解决 dcloudio 官方的 @dcloudio/uni-mp-compiler 出现的编译 BUG
        // 参考 github issue: https://github.com/dcloudio/uni-app/issues/4952
        // 自定义插件禁用 vite:vue 插件的 devToolsEnabled，强制编译 vue 模板时 inline 为 true
        name: "fix-vite-plugin-vue",
        configResolved(config) {
          const plugin = config.plugins.find((p) => p.name === "vite:vue");
          if (plugin && plugin.api && plugin.api.options) {
            plugin.api.options.devToolsEnabled = false;
          }
        }
      },
      UnoCSS(),
      AutoImport({
        imports: ["vue", "uni-app"],
        dts: "src/types/auto-import.d.ts",
        dirs: ["src/hooks"],
        // 自动导入 hooks
        vueTemplate: true
        // default false
      }),
      ViteRestart({
        // 通过这个插件，在修改vite.config.js文件则不需要重新运行也生效配置
        restart: ["vite.config.js"]
      }),
      // h5环境增加 BUILD_TIME 和 BUILD_BRANCH
      UNI_PLATFORM === "h5" && {
        name: "html-transform",
        transformIndexHtml(html) {
          return html.replace("%BUILD_TIME%", dayjs().format("YYYY-MM-DD HH:mm:ss")).replace("%VITE_APP_TITLE%", VITE_APP_TITLE);
        }
      },
      // 打包分析插件，h5 + 生产环境才弹出
      UNI_PLATFORM === "h5" && mode === "production" && visualizer({
        filename: "./node_modules/.cache/visualizer/stats.html",
        open: true,
        gzipSize: true,
        brotliSize: true
      }),
      // 原生插件资源复制插件 - 仅在 app 平台且启用时生效
      createCopyNativeResourcesPlugin(
        UNI_PLATFORM === "app" && VITE_COPY_NATIVE_RES_ENABLE === "true",
        {
          verbose: mode === "development"
          // 开发模式显示详细日志
        }
      ),
      syncManifestPlugin(),
      Components({
        extensions: ["vue"],
        deep: true,
        // 是否递归扫描子目录，
        directoryAsNamespace: false,
        // 是否把目录名作为命名空间前缀，true 时组件名为 目录名+组件名，
        dts: "src/types/components.d.ts"
        // 自动生成的组件类型声明文件路径（用于 TypeScript 支持）
      }),
      // 自动打开开发者工具插件 (必须修改 .env 文件中的 VITE_WX_APPID)
      openDevTools()
    ],
    define: {
      __VITE_APP_PROXY__: JSON.stringify(VITE_APP_PROXY_ENABLE)
    },
    css: {
      postcss: {
        plugins: [
          // autoprefixer({
          //   // 指定目标浏览器
          //   overrideBrowserslist: ['> 1%', 'last 2 versions'],
          // }),
        ]
      }
    },
    resolve: {
      alias: {
        "@": path4.join(process4.cwd(), "./src"),
        "@img": path4.join(process4.cwd(), "./src/static/images")
      }
    },
    server: {
      host: "0.0.0.0",
      hmr: true,
      port: Number.parseInt(VITE_APP_PORT, 10),
      // 仅 H5 端生效，其他端不生效（其他端走build，不走devServer)
      proxy: JSON.parse(VITE_APP_PROXY_ENABLE) ? {
        [VITE_APP_PROXY_PREFIX]: {
          target: VITE_SERVER_BASEURL,
          changeOrigin: true,
          // 后端有/api前缀则不做处理，没有则需要去掉
          rewrite: (path5) => path5.replace(new RegExp(`^${VITE_APP_PROXY_PREFIX}`), "")
        }
      } : void 0
    },
    esbuild: {
      drop: VITE_DELETE_CONSOLE === "true" ? ["console", "debugger"] : []
    },
    build: {
      sourcemap: false,
      // 方便非h5端调试
      // sourcemap: VITE_SHOW_SOURCEMAP === 'true', // 默认是false
      target: "es6",
      // 开发环境不用压缩
      minify: mode === "development" ? false : "esbuild"
    }
  });
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic2NyaXB0cy9vcGVuLWRldi10b29scy5qcyIsICJ2aXRlLXBsdWdpbnMvY29weS1uYXRpdmUtcmVzb3VyY2VzLnRzIiwgInZpdGUtcGx1Z2lucy9zeW5jLW1hbmlmZXN0LXBsdWdpbnMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxmZW5neWlpaWlpXFxcXERlc2t0b3BcXFxcdW5pYmVzdC1kb2N0b3ItZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGZlbmd5aWlpaWlcXFxcRGVza3RvcFxcXFx1bmliZXN0LWRvY3Rvci1mcm9udGVuZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvZmVuZ3lpaWlpaS9EZXNrdG9wL3VuaWJlc3QtZG9jdG9yLWZyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xyXG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnXHJcbmltcG9ydCBVbmkgZnJvbSAnQHVuaS1oZWxwZXIvcGx1Z2luLXVuaSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAnQHVuaS1oZWxwZXIvdml0ZS1wbHVnaW4tdW5pLWNvbXBvbmVudHMnXHJcbi8vIEBzZWUgaHR0cHM6Ly91bmktaGVscGVyLmpzLm9yZy92aXRlLXBsdWdpbi11bmktbGF5b3V0c1xyXG5pbXBvcnQgVW5pTGF5b3V0cyBmcm9tICdAdW5pLWhlbHBlci92aXRlLXBsdWdpbi11bmktbGF5b3V0cydcclxuLy8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdW5pLWhlbHBlci92aXRlLXBsdWdpbi11bmktbWFuaWZlc3RcclxuaW1wb3J0IFVuaU1hbmlmZXN0IGZyb20gJ0B1bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1tYW5pZmVzdCdcclxuLy8gQHNlZSBodHRwczovL3VuaS1oZWxwZXIuanMub3JnL3ZpdGUtcGx1Z2luLXVuaS1wYWdlc1xyXG5pbXBvcnQgVW5pUGFnZXMgZnJvbSAnQHVuaS1oZWxwZXIvdml0ZS1wbHVnaW4tdW5pLXBhZ2VzJ1xyXG4vLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1wbGF0Zm9ybVxyXG4vLyBcdTk3MDBcdTg5ODFcdTRFMEUgQHVuaS1oZWxwZXIvdml0ZS1wbHVnaW4tdW5pLXBhZ2VzIFx1NjNEMlx1NEVGNlx1NEUwMFx1OEQ3N1x1NEY3Rlx1NzUyOFxyXG5pbXBvcnQgVW5pUGxhdGZvcm0gZnJvbSAnQHVuaS1oZWxwZXIvdml0ZS1wbHVnaW4tdW5pLXBsYXRmb3JtJ1xyXG4vKipcclxuICogXHU1MjA2XHU1MzA1XHU0RjE4XHU1MzE2XHUzMDAxXHU2QTIxXHU1NzU3XHU1RjAyXHU2QjY1XHU4REU4XHU1MzA1XHU4QzAzXHU3NTI4XHUzMDAxXHU3RUM0XHU0RUY2XHU1RjAyXHU2QjY1XHU4REU4XHU1MzA1XHU1RjE1XHU3NTI4XHJcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3VuaS1rdS9idW5kbGUtb3B0aW1pemVyXHJcbiAqL1xyXG5pbXBvcnQgT3B0aW1pemF0aW9uIGZyb20gJ0B1bmkta3UvYnVuZGxlLW9wdGltaXplcidcclxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3VuaS1rdS9yb290XHJcbmltcG9ydCBVbmlLdVJvb3QgZnJvbSAnQHVuaS1rdS9yb290J1xyXG5pbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnXHJcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInXHJcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCBWaXRlUmVzdGFydCBmcm9tICd2aXRlLXBsdWdpbi1yZXN0YXJ0J1xyXG5pbXBvcnQgb3BlbkRldlRvb2xzIGZyb20gJy4vc2NyaXB0cy9vcGVuLWRldi10b29scydcclxuaW1wb3J0IHsgY3JlYXRlQ29weU5hdGl2ZVJlc291cmNlc1BsdWdpbiB9IGZyb20gJy4vdml0ZS1wbHVnaW5zL2NvcHktbmF0aXZlLXJlc291cmNlcydcclxuaW1wb3J0IHN5bmNNYW5pZmVzdFBsdWdpbiBmcm9tICcuL3ZpdGUtcGx1Z2lucy9zeW5jLW1hbmlmZXN0LXBsdWdpbnMnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XHJcbiAgLy8gQHNlZSBodHRwczovL3Vub2Nzcy5kZXYvXHJcbiAgLy8gY29uc3QgVW5vQ1NTID0gKGF3YWl0IGltcG9ydCgndW5vY3NzL3ZpdGUnKSkuZGVmYXVsdFxyXG4gIC8vIGNvbnNvbGUubG9nKG1vZGUgPT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKSAvLyB0cnVlXHJcblxyXG4gIC8vIG1vZGU6IFx1NTMzQVx1NTIwNlx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1OEZEOFx1NjYyRlx1NUYwMFx1NTNEMVx1NzNBRlx1NTg4M1xyXG4gIGNvbnNvbGUubG9nKCdjb21tYW5kLCBtb2RlIC0+ICcsIGNvbW1hbmQsIG1vZGUpXHJcbiAgLy8gcG5wbSBkZXY6aDUgXHU2NUY2XHU1Rjk3XHU1MjMwID0+IHNlcnZlIGRldmVsb3BtZW50XHJcbiAgLy8gcG5wbSBidWlsZDpoNSBcdTY1RjZcdTVGOTdcdTUyMzAgPT4gYnVpbGQgcHJvZHVjdGlvblxyXG4gIC8vIHBucG0gZGV2Om1wLXdlaXhpbiBcdTY1RjZcdTVGOTdcdTUyMzAgPT4gYnVpbGQgZGV2ZWxvcG1lbnQgKFx1NkNFOFx1NjEwRlx1NTMzQVx1NTIyQlx1RkYwQ2NvbW1hbmRcdTRFM0FidWlsZClcclxuICAvLyBwbnBtIGJ1aWxkOm1wLXdlaXhpbiBcdTY1RjZcdTVGOTdcdTUyMzAgPT4gYnVpbGQgcHJvZHVjdGlvblxyXG4gIC8vIHBucG0gZGV2OmFwcCBcdTY1RjZcdTVGOTdcdTUyMzAgPT4gYnVpbGQgZGV2ZWxvcG1lbnQgKFx1NkNFOFx1NjEwRlx1NTMzQVx1NTIyQlx1RkYwQ2NvbW1hbmRcdTRFM0FidWlsZClcclxuICAvLyBwbnBtIGJ1aWxkOmFwcCBcdTY1RjZcdTVGOTdcdTUyMzAgPT4gYnVpbGQgcHJvZHVjdGlvblxyXG4gIC8vIGRldiBcdTU0OEMgYnVpbGQgXHU1NDdEXHU0RUU0XHU1M0VGXHU0RUU1XHU1MjA2XHU1MjJCXHU0RjdGXHU3NTI4IC5lbnYuZGV2ZWxvcG1lbnQgXHU1NDhDIC5lbnYucHJvZHVjdGlvbiBcdTc2ODRcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcclxuXHJcbiAgY29uc3QgeyBVTklfUExBVEZPUk0gfSA9IHByb2Nlc3MuZW52XHJcbiAgY29uc29sZS5sb2coJ1VOSV9QTEFURk9STSAtPiAnLCBVTklfUExBVEZPUk0pIC8vIFx1NUY5N1x1NTIzMCBtcC13ZWl4aW4sIGg1LCBhcHAgXHU3QjQ5XHJcblxyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdlbnYnKSlcclxuICBjb25zdCB7XHJcbiAgICBWSVRFX0FQUF9QT1JULFxyXG4gICAgVklURV9TRVJWRVJfQkFTRVVSTCxcclxuICAgIFZJVEVfQVBQX1RJVExFLFxyXG4gICAgVklURV9ERUxFVEVfQ09OU09MRSxcclxuICAgIFZJVEVfQVBQX1BVQkxJQ19CQVNFLFxyXG4gICAgVklURV9BUFBfUFJPWFlfRU5BQkxFLFxyXG4gICAgVklURV9BUFBfUFJPWFlfUFJFRklYLFxyXG4gICAgVklURV9DT1BZX05BVElWRV9SRVNfRU5BQkxFLFxyXG4gIH0gPSBlbnZcclxuICBjb25zb2xlLmxvZygnXHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGIGVudiAtPiAnLCBlbnYpXHJcblxyXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xyXG4gICAgZW52RGlyOiAnLi9lbnYnLCAvLyBcdTgxRUFcdTVCOUFcdTRFNDllbnZcdTc2RUVcdTVGNTVcclxuICAgIGJhc2U6IFZJVEVfQVBQX1BVQkxJQ19CQVNFLFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICBVbmlMYXlvdXRzKCksXHJcbiAgICAgIFVuaVBsYXRmb3JtKCksXHJcbiAgICAgIFVuaU1hbmlmZXN0KCksXHJcbiAgICAgIFVuaVBhZ2VzKHtcclxuICAgICAgICBleGNsdWRlOiBbJyoqL2NvbXBvbmVudHMvKiovKiouKiddLFxyXG4gICAgICAgIC8vIHBhZ2VzIFx1NzZFRVx1NUY1NVx1NEUzQSBzcmMvcGFnZXNcdUZGMENcdTUyMDZcdTUzMDVcdTc2RUVcdTVGNTVcdTRFMERcdTgwRkRcdTkxNERcdTdGNkVcdTU3MjhwYWdlc1x1NzZFRVx1NUY1NVx1NEUwQlx1RkYwMVx1RkYwMVxyXG4gICAgICAgIC8vIFx1NjYyRlx1NEUyQVx1NjU3MFx1N0VDNFx1RkYwQ1x1NTNFRlx1NEVFNVx1OTE0RFx1N0Y2RVx1NTkxQVx1NEUyQVx1RkYwQ1x1NEY0Nlx1NjYyRlx1NEUwRFx1ODBGRFx1NEUzQXBhZ2VzXHU5MUNDXHU5NzYyXHU3Njg0XHU3NkVFXHU1RjU1XHVGRjAxXHVGRjAxXHJcbiAgICAgICAgc3ViUGFja2FnZXM6IFtcclxuICAgICAgICAgICdzcmMvcGFnZXMtZmcnLCAvLyBcdThGRDlcdTRFMkFcdTY2MkZcdTc2RjhcdTVCRjlcdTVGQzVcdTg5ODFcdTc2ODRcdThERUZcdTc1MzFcdUZGMENcdTVDM0RcdTkxQ0ZcdTc1NTlcdTc3NDBcdUZGMDhcdTc2N0JcdTVGNTVcdTk4NzVcdTMwMDFcdTZDRThcdTUxOENcdTk4NzVcdTMwMDE0MDRcdTk4NzVcdTdCNDlcdUZGMDlcclxuICAgICAgICBdLFxyXG4gICAgICAgIGR0czogJ3NyYy90eXBlcy91bmktcGFnZXMuZC50cycsXHJcbiAgICAgIH0pLFxyXG4gICAgICAvLyBPcHRpbWl6YXRpb24gXHU2M0QyXHU0RUY2XHU5NzAwXHU4OTgxIHBhZ2UuanNvbiBcdTY1ODdcdTRFRjZcdUZGMENcdTY1NDVcdTVFOTRcdTU3MjggVW5pUGFnZXMgXHU2M0QyXHU0RUY2XHU0RTRCXHU1NDBFXHU2MjY3XHU4ODRDXHJcbiAgICAgIE9wdGltaXphdGlvbih7XHJcbiAgICAgICAgZW5hYmxlOiB7XHJcbiAgICAgICAgICAnb3B0aW1pemF0aW9uJzogdHJ1ZSxcclxuICAgICAgICAgICdhc3luYy1pbXBvcnQnOiB0cnVlLFxyXG4gICAgICAgICAgJ2FzeW5jLWNvbXBvbmVudCc6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkdHM6IHtcclxuICAgICAgICAgIGJhc2U6ICdzcmMvdHlwZXMnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbG9nZ2VyOiBmYWxzZSxcclxuICAgICAgfSksXHJcbiAgICAgIC8vIFVuaVhYWCBcdTk3MDBcdTg5ODFcdTU3MjggVW5pIFx1NEU0Qlx1NTI0RFx1NUYxNVx1NTE2NVxyXG4gICAgICAvLyBcdTgyRTVcdTVCNThcdTU3MjhcdTY1MzlcdTUzRDggcGFnZXMuanNvbiBcdTc2ODRcdTYzRDJcdTRFRjZcdUZGMENcdThCRjdcdTVDMDYgVW5pS3VSb290IFx1NjUzRVx1N0Y2RVx1NTE3Nlx1NTQwRVxyXG4gICAgICBVbmlLdVJvb3Qoe1xyXG4gICAgICAgIGV4Y2x1ZGVQYWdlczogWycqKi9jb21wb25lbnRzLyoqLyoqLionXSxcclxuICAgICAgfSksXHJcbiAgICAgIFVuaSgpLFxyXG4gICAgICB7XHJcbiAgICAgICAgLy8gXHU0RTM0XHU2NUY2XHU4OUUzXHU1MUIzIGRjbG91ZGlvIFx1NUI5OFx1NjVCOVx1NzY4NCBAZGNsb3VkaW8vdW5pLW1wLWNvbXBpbGVyIFx1NTFGQVx1NzNCMFx1NzY4NFx1N0YxNlx1OEJEMSBCVUdcclxuICAgICAgICAvLyBcdTUzQzJcdTgwMDMgZ2l0aHViIGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vZGNsb3VkaW8vdW5pLWFwcC9pc3N1ZXMvNDk1MlxyXG4gICAgICAgIC8vIFx1ODFFQVx1NUI5QVx1NEU0OVx1NjNEMlx1NEVGNlx1Nzk4MVx1NzUyOCB2aXRlOnZ1ZSBcdTYzRDJcdTRFRjZcdTc2ODQgZGV2VG9vbHNFbmFibGVkXHVGRjBDXHU1RjNBXHU1MjM2XHU3RjE2XHU4QkQxIHZ1ZSBcdTZBMjFcdTY3N0ZcdTY1RjYgaW5saW5lIFx1NEUzQSB0cnVlXHJcbiAgICAgICAgbmFtZTogJ2ZpeC12aXRlLXBsdWdpbi12dWUnLFxyXG4gICAgICAgIGNvbmZpZ1Jlc29sdmVkKGNvbmZpZykge1xyXG4gICAgICAgICAgY29uc3QgcGx1Z2luID0gY29uZmlnLnBsdWdpbnMuZmluZChwID0+IHAubmFtZSA9PT0gJ3ZpdGU6dnVlJylcclxuICAgICAgICAgIGlmIChwbHVnaW4gJiYgcGx1Z2luLmFwaSAmJiBwbHVnaW4uYXBpLm9wdGlvbnMpIHtcclxuICAgICAgICAgICAgcGx1Z2luLmFwaS5vcHRpb25zLmRldlRvb2xzRW5hYmxlZCA9IGZhbHNlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgVW5vQ1NTKCksXHJcbiAgICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICAgIGltcG9ydHM6IFsndnVlJywgJ3VuaS1hcHAnXSxcclxuICAgICAgICBkdHM6ICdzcmMvdHlwZXMvYXV0by1pbXBvcnQuZC50cycsXHJcbiAgICAgICAgZGlyczogWydzcmMvaG9va3MnXSwgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IGhvb2tzXHJcbiAgICAgICAgdnVlVGVtcGxhdGU6IHRydWUsIC8vIGRlZmF1bHQgZmFsc2VcclxuICAgICAgfSksXHJcbiAgICAgIFZpdGVSZXN0YXJ0KHtcclxuICAgICAgICAvLyBcdTkwMUFcdThGQzdcdThGRDlcdTRFMkFcdTYzRDJcdTRFRjZcdUZGMENcdTU3MjhcdTRGRUVcdTY1Mzl2aXRlLmNvbmZpZy5qc1x1NjU4N1x1NEVGNlx1NTIxOVx1NEUwRFx1OTcwMFx1ODk4MVx1OTFDRFx1NjVCMFx1OEZEMFx1ODg0Q1x1NEU1Rlx1NzUxRlx1NjU0OFx1OTE0RFx1N0Y2RVxyXG4gICAgICAgIHJlc3RhcnQ6IFsndml0ZS5jb25maWcuanMnXSxcclxuICAgICAgfSksXHJcbiAgICAgIC8vIGg1XHU3M0FGXHU1ODgzXHU1ODlFXHU1MkEwIEJVSUxEX1RJTUUgXHU1NDhDIEJVSUxEX0JSQU5DSFxyXG4gICAgICBVTklfUExBVEZPUk0gPT09ICdoNScgJiYge1xyXG4gICAgICAgIG5hbWU6ICdodG1sLXRyYW5zZm9ybScsXHJcbiAgICAgICAgdHJhbnNmb3JtSW5kZXhIdG1sKGh0bWwpIHtcclxuICAgICAgICAgIHJldHVybiBodG1sLnJlcGxhY2UoJyVCVUlMRF9USU1FJScsIGRheWpzKCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJykpLnJlcGxhY2UoJyVWSVRFX0FQUF9USVRMRSUnLCBWSVRFX0FQUF9USVRMRSlcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICAvLyBcdTYyNTNcdTUzMDVcdTUyMDZcdTY3OTBcdTYzRDJcdTRFRjZcdUZGMENoNSArIFx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1NjI0RFx1NUYzOVx1NTFGQVxyXG4gICAgICBVTklfUExBVEZPUk0gPT09ICdoNSdcclxuICAgICAgJiYgbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nXHJcbiAgICAgICYmIHZpc3VhbGl6ZXIoe1xyXG4gICAgICAgIGZpbGVuYW1lOiAnLi9ub2RlX21vZHVsZXMvLmNhY2hlL3Zpc3VhbGl6ZXIvc3RhdHMuaHRtbCcsXHJcbiAgICAgICAgb3BlbjogdHJ1ZSxcclxuICAgICAgICBnemlwU2l6ZTogdHJ1ZSxcclxuICAgICAgICBicm90bGlTaXplOiB0cnVlLFxyXG4gICAgICB9KSxcclxuICAgICAgLy8gXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU4RDQ0XHU2RTkwXHU1OTBEXHU1MjM2XHU2M0QyXHU0RUY2IC0gXHU0RUM1XHU1NzI4IGFwcCBcdTVFNzNcdTUzRjBcdTRFMTRcdTU0MkZcdTc1MjhcdTY1RjZcdTc1MUZcdTY1NDhcclxuICAgICAgY3JlYXRlQ29weU5hdGl2ZVJlc291cmNlc1BsdWdpbihcclxuICAgICAgICBVTklfUExBVEZPUk0gPT09ICdhcHAnICYmIFZJVEVfQ09QWV9OQVRJVkVfUkVTX0VOQUJMRSA9PT0gJ3RydWUnLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHZlcmJvc2U6IG1vZGUgPT09ICdkZXZlbG9wbWVudCcsIC8vIFx1NUYwMFx1NTNEMVx1NkEyMVx1NUYwRlx1NjYzRVx1NzkzQVx1OEJFNlx1N0VDNlx1NjVFNVx1NUZEN1xyXG4gICAgICAgIH0sXHJcbiAgICAgICksXHJcbiAgICAgIHN5bmNNYW5pZmVzdFBsdWdpbigpLFxyXG4gICAgICBDb21wb25lbnRzKHtcclxuICAgICAgICBleHRlbnNpb25zOiBbJ3Z1ZSddLFxyXG4gICAgICAgIGRlZXA6IHRydWUsIC8vIFx1NjYyRlx1NTQyNlx1OTAxMlx1NUY1Mlx1NjI2Qlx1NjNDRlx1NUI1MFx1NzZFRVx1NUY1NVx1RkYwQ1xyXG4gICAgICAgIGRpcmVjdG9yeUFzTmFtZXNwYWNlOiBmYWxzZSwgLy8gXHU2NjJGXHU1NDI2XHU2MjhBXHU3NkVFXHU1RjU1XHU1NDBEXHU0RjVDXHU0RTNBXHU1NDdEXHU1NDBEXHU3QTdBXHU5NUY0XHU1MjREXHU3RjAwXHVGRjBDdHJ1ZSBcdTY1RjZcdTdFQzRcdTRFRjZcdTU0MERcdTRFM0EgXHU3NkVFXHU1RjU1XHU1NDBEK1x1N0VDNFx1NEVGNlx1NTQwRFx1RkYwQ1xyXG4gICAgICAgIGR0czogJ3NyYy90eXBlcy9jb21wb25lbnRzLmQudHMnLCAvLyBcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTBcdTc2ODRcdTdFQzRcdTRFRjZcdTdDN0JcdTU3OEJcdTU4RjBcdTY2MEVcdTY1ODdcdTRFRjZcdThERUZcdTVGODRcdUZGMDhcdTc1MjhcdTRFOEUgVHlwZVNjcmlwdCBcdTY1MkZcdTYzMDFcdUZGMDlcclxuICAgICAgfSksXHJcbiAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NjI1M1x1NUYwMFx1NUYwMFx1NTNEMVx1ODAwNVx1NURFNVx1NTE3N1x1NjNEMlx1NEVGNiAoXHU1RkM1XHU5ODdCXHU0RkVFXHU2NTM5IC5lbnYgXHU2NTg3XHU0RUY2XHU0RTJEXHU3Njg0IFZJVEVfV1hfQVBQSUQpXHJcbiAgICAgIG9wZW5EZXZUb29scygpLFxyXG4gICAgXSxcclxuICAgIGRlZmluZToge1xyXG4gICAgICBfX1ZJVEVfQVBQX1BST1hZX186IEpTT04uc3RyaW5naWZ5KFZJVEVfQVBQX1BST1hZX0VOQUJMRSksXHJcbiAgICB9LFxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHBvc3Rjc3M6IHtcclxuICAgICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgICAvLyBhdXRvcHJlZml4ZXIoe1xyXG4gICAgICAgICAgLy8gICAvLyBcdTYzMDdcdTVCOUFcdTc2RUVcdTY4MDdcdTZENEZcdTg5QzhcdTU2NjhcclxuICAgICAgICAgIC8vICAgb3ZlcnJpZGVCcm93c2Vyc2xpc3Q6IFsnPiAxJScsICdsYXN0IDIgdmVyc2lvbnMnXSxcclxuICAgICAgICAgIC8vIH0pLFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQCc6IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnLi9zcmMnKSxcclxuICAgICAgICAnQGltZyc6IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnLi9zcmMvc3RhdGljL2ltYWdlcycpLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBob3N0OiAnMC4wLjAuMCcsXHJcbiAgICAgIGhtcjogdHJ1ZSxcclxuICAgICAgcG9ydDogTnVtYmVyLnBhcnNlSW50KFZJVEVfQVBQX1BPUlQsIDEwKSxcclxuICAgICAgLy8gXHU0RUM1IEg1IFx1N0FFRlx1NzUxRlx1NjU0OFx1RkYwQ1x1NTE3Nlx1NEVENlx1N0FFRlx1NEUwRFx1NzUxRlx1NjU0OFx1RkYwOFx1NTE3Nlx1NEVENlx1N0FFRlx1OEQ3MGJ1aWxkXHVGRjBDXHU0RTBEXHU4RDcwZGV2U2VydmVyKVxyXG4gICAgICBwcm94eTogSlNPTi5wYXJzZShWSVRFX0FQUF9QUk9YWV9FTkFCTEUpXHJcbiAgICAgICAgPyB7XHJcbiAgICAgICAgICAgIFtWSVRFX0FQUF9QUk9YWV9QUkVGSVhdOiB7XHJcbiAgICAgICAgICAgICAgdGFyZ2V0OiBWSVRFX1NFUlZFUl9CQVNFVVJMLFxyXG4gICAgICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAvLyBcdTU0MEVcdTdBRUZcdTY3MDkvYXBpXHU1MjREXHU3RjAwXHU1MjE5XHU0RTBEXHU1MDVBXHU1OTA0XHU3NDA2XHVGRjBDXHU2Q0ExXHU2NzA5XHU1MjE5XHU5NzAwXHU4OTgxXHU1M0JCXHU2Mzg5XHJcbiAgICAgICAgICAgICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cChgXiR7VklURV9BUFBfUFJPWFlfUFJFRklYfWApLCAnJyksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgOiB1bmRlZmluZWQsXHJcbiAgICB9LFxyXG4gICAgZXNidWlsZDoge1xyXG4gICAgICBkcm9wOiBWSVRFX0RFTEVURV9DT05TT0xFID09PSAndHJ1ZScgPyBbJ2NvbnNvbGUnLCAnZGVidWdnZXInXSA6IFtdLFxyXG4gICAgfSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIHNvdXJjZW1hcDogZmFsc2UsXHJcbiAgICAgIC8vIFx1NjVCOVx1NEZCRlx1OTc1RWg1XHU3QUVGXHU4QzAzXHU4QkQ1XHJcbiAgICAgIC8vIHNvdXJjZW1hcDogVklURV9TSE9XX1NPVVJDRU1BUCA9PT0gJ3RydWUnLCAvLyBcdTlFRDhcdThCQTRcdTY2MkZmYWxzZVxyXG4gICAgICB0YXJnZXQ6ICdlczYnLFxyXG4gICAgICAvLyBcdTVGMDBcdTUzRDFcdTczQUZcdTU4ODNcdTRFMERcdTc1MjhcdTUzOEJcdTdGMjlcclxuICAgICAgbWluaWZ5OiBtb2RlID09PSAnZGV2ZWxvcG1lbnQnID8gZmFsc2UgOiAnZXNidWlsZCcsXHJcbiAgICB9LFxyXG4gIH0pXHJcbn0pXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZmVuZ3lpaWlpaVxcXFxEZXNrdG9wXFxcXHVuaWJlc3QtZG9jdG9yLWZyb250ZW5kXFxcXHNjcmlwdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGZlbmd5aWlpaWlcXFxcRGVza3RvcFxcXFx1bmliZXN0LWRvY3Rvci1mcm9udGVuZFxcXFxzY3JpcHRzXFxcXG9wZW4tZGV2LXRvb2xzLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9mZW5neWlpaWlpL0Rlc2t0b3AvdW5pYmVzdC1kb2N0b3ItZnJvbnRlbmQvc2NyaXB0cy9vcGVuLWRldi10b29scy5qc1wiO2ltcG9ydCB7IGV4ZWMgfSBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnXHJcbmltcG9ydCBmcyBmcm9tICdub2RlOmZzJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXHJcbmltcG9ydCBwcm9jZXNzIGZyb20gJ25vZGU6cHJvY2VzcydcclxuXHJcbi8qKlxyXG4gKiBcdTYyNTNcdTVGMDBcdTVGMDBcdTUzRDFcdTgwMDVcdTVERTVcdTUxNzdcclxuICovXHJcbmZ1bmN0aW9uIF9vcGVuRGV2VG9vbHMoKSB7XHJcbiAgY29uc3QgcGxhdGZvcm0gPSBwcm9jZXNzLnBsYXRmb3JtIC8vIGRhcndpbiwgd2luMzIsIGxpbnV4XHJcbiAgY29uc3QgeyBVTklfUExBVEZPUk0gfSA9IHByb2Nlc3MuZW52IC8vICBtcC13ZWl4aW4sIG1wLWFsaXBheVxyXG5cclxuICBjb25zdCB1bmlQbGF0Zm9ybVRleHQgPSBVTklfUExBVEZPUk0gPT09ICdtcC13ZWl4aW4nID8gJ1x1NUZBRVx1NEZFMVx1NUMwRlx1N0EwQlx1NUU4RicgOiBVTklfUExBVEZPUk0gPT09ICdtcC1hbGlwYXknID8gJ1x1NjUyRlx1NEVEOFx1NUI5RFx1NUMwRlx1N0EwQlx1NUU4RicgOiAnXHU1QzBGXHU3QTBCXHU1RThGJ1xyXG5cclxuICAvLyBcdTk4NzlcdTc2RUVcdThERUZcdTVGODRcdUZGMDhcdTY3ODRcdTVFRkFcdThGOTNcdTUxRkFcdTc2RUVcdTVGNTVcdUZGMDlcclxuICBjb25zdCBwcm9qZWN0UGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBgZGlzdC9kZXYvJHtVTklfUExBVEZPUk19YClcclxuXHJcbiAgLy8gXHU2OEMwXHU2N0U1XHU2Nzg0XHU1RUZBXHU4RjkzXHU1MUZBXHU3NkVFXHU1RjU1XHU2NjJGXHU1NDI2XHU1QjU4XHU1NzI4XHJcbiAgaWYgKCFmcy5leGlzdHNTeW5jKHByb2plY3RQYXRoKSkge1xyXG4gICAgY29uc29sZS5sb2coYFx1Mjc0QyAke3VuaVBsYXRmb3JtVGV4dH1cdTY3ODRcdTVFRkFcdTc2RUVcdTVGNTVcdTRFMERcdTVCNThcdTU3Mjg6YCwgcHJvamVjdFBhdGgpXHJcbiAgICByZXR1cm5cclxuICB9XHJcblxyXG4gIGNvbnNvbGUubG9nKGBcdUQ4M0RcdURFODAgXHU2QjYzXHU1NzI4XHU2MjUzXHU1RjAwJHt1bmlQbGF0Zm9ybVRleHR9XHU1RjAwXHU1M0QxXHU4MDA1XHU1REU1XHU1MTc3Li4uYClcclxuXHJcbiAgLy8gXHU2ODM5XHU2MzZFXHU0RTBEXHU1NDBDXHU2NENEXHU0RjVDXHU3Q0ZCXHU3RURGXHU2MjY3XHU4ODRDXHU0RTBEXHU1NDBDXHU1NDdEXHU0RUU0XHJcbiAgbGV0IGNvbW1hbmQgPSAnJ1xyXG5cclxuICBpZiAocGxhdGZvcm0gPT09ICdkYXJ3aW4nKSB7XHJcbiAgICAvLyBtYWNPU1xyXG4gICAgaWYgKFVOSV9QTEFURk9STSA9PT0gJ21wLXdlaXhpbicpIHtcclxuICAgICAgY29tbWFuZCA9IGAvQXBwbGljYXRpb25zL3dlY2hhdHdlYmRldnRvb2xzLmFwcC9Db250ZW50cy9NYWNPUy9jbGkgLW8gXCIke3Byb2plY3RQYXRofVwiYFxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoVU5JX1BMQVRGT1JNID09PSAnbXAtYWxpcGF5Jykge1xyXG4gICAgICBjb21tYW5kID0gYC9BcHBsaWNhdGlvbnMvXHU1QzBGXHU3QTBCXHU1RThGXHU1RjAwXHU1M0QxXHU4MDA1XHU1REU1XHU1MTc3LmFwcC9Db250ZW50cy9NYWNPUy9cdTVDMEZcdTdBMEJcdTVFOEZcdTVGMDBcdTUzRDFcdTgwMDVcdTVERTVcdTUxNzcgLS1wIFwiJHtwcm9qZWN0UGF0aH1cImBcclxuICAgIH1cclxuICB9XHJcbiAgZWxzZSBpZiAocGxhdGZvcm0gPT09ICd3aW4zMicgfHwgcGxhdGZvcm0gPT09ICd3aW42NCcpIHtcclxuICAgIC8vIFdpbmRvd3NcclxuICAgIGlmIChVTklfUExBVEZPUk0gPT09ICdtcC13ZWl4aW4nKSB7XHJcbiAgICAgIGNvbW1hbmQgPSBgXCJDOlxcXFxQcm9ncmFtIEZpbGVzICh4ODYpXFxcXFRlbmNlbnRcXFxcXHU1RkFFXHU0RkUxd2ViXHU1RjAwXHU1M0QxXHU4MDA1XHU1REU1XHU1MTc3XFxcXGNsaS5iYXRcIiAtbyBcIiR7cHJvamVjdFBhdGh9XCJgXHJcbiAgICB9XHJcbiAgfVxyXG4gIGVsc2Uge1xyXG4gICAgLy8gTGludXggXHU2MjE2XHU1MTc2XHU0RUQ2XHU3Q0ZCXHU3RURGXHJcbiAgICBjb25zb2xlLmxvZygnXHUyNzRDIFx1NUY1M1x1NTI0RFx1N0NGQlx1N0VERlx1NEUwRFx1NjUyRlx1NjMwMVx1ODFFQVx1NTJBOFx1NjI1M1x1NUYwMFx1NUZBRVx1NEZFMVx1NUYwMFx1NTNEMVx1ODAwNVx1NURFNVx1NTE3NycpXHJcbiAgICByZXR1cm5cclxuICB9XHJcblxyXG4gIGV4ZWMoY29tbWFuZCwgKGVycm9yLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xyXG4gICAgaWYgKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGBcdTI3NEMgXHU2MjUzXHU1RjAwJHt1bmlQbGF0Zm9ybVRleHR9XHU1RjAwXHU1M0QxXHU4MDA1XHU1REU1XHU1MTc3XHU1OTMxXHU4RDI1OmAsIGVycm9yLm1lc3NhZ2UpXHJcbiAgICAgIGNvbnNvbGUubG9nKGBcdUQ4M0RcdURDQTEgXHU4QkY3XHU3ODZFXHU0RkREJHt1bmlQbGF0Zm9ybVRleHR9XHU1RjAwXHU1M0QxXHU4MDA1XHU1REU1XHU1MTc3XHU2NzBEXHU1MkExXHU3QUVGXHU1M0UzXHU1REYyXHU1NDJGXHU3NTI4YClcclxuICAgICAgY29uc29sZS5sb2coYFx1RDgzRFx1RENBMSBcdTUzRUZcdTRFRTVcdTYyNEJcdTUyQThcdTYyNTNcdTVGMDAke3VuaVBsYXRmb3JtVGV4dH1cdTVGMDBcdTUzRDFcdTgwMDVcdTVERTVcdTUxNzdcdTVFNzZcdTVCRkNcdTUxNjVcdTk4NzlcdTc2RUU6YCwgcHJvamVjdFBhdGgpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGlmIChzdGRlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coJ1x1MjZBMFx1RkUwRiBcdThCNjZcdTU0NEE6Jywgc3RkZXJyKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKGBcdTI3MDUgJHt1bmlQbGF0Zm9ybVRleHR9XHU1RjAwXHU1M0QxXHU4MDA1XHU1REU1XHU1MTc3XHU1REYyXHU2MjUzXHU1RjAwYClcclxuXHJcbiAgICBpZiAoc3Rkb3V0KSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHN0ZG91dClcclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvcGVuRGV2VG9vbHMoKSB7XHJcbiAgLy8gXHU5OTk2XHU2QjIxXHU2Nzg0XHU1RUZBXHU2ODA3XHU4QkIwXHJcbiAgbGV0IGlzRmlyc3RCdWlsZCA9IHRydWVcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWU6ICd1bmktZGV2dG9vbHMnLFxyXG4gICAgd3JpdGVCdW5kbGUoKSB7XHJcbiAgICAgIGlmIChpc0ZpcnN0QnVpbGQgJiYgcHJvY2Vzcy5lbnYuVU5JX1BMQVRGT1JNPy5pbmNsdWRlcygnbXAnKSkge1xyXG4gICAgICAgIGlzRmlyc3RCdWlsZCA9IGZhbHNlXHJcbiAgICAgICAgX29wZW5EZXZUb29scygpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZmVuZ3lpaWlpaVxcXFxEZXNrdG9wXFxcXHVuaWJlc3QtZG9jdG9yLWZyb250ZW5kXFxcXHZpdGUtcGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZmVuZ3lpaWlpaVxcXFxEZXNrdG9wXFxcXHVuaWJlc3QtZG9jdG9yLWZyb250ZW5kXFxcXHZpdGUtcGx1Z2luc1xcXFxjb3B5LW5hdGl2ZS1yZXNvdXJjZXMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2Zlbmd5aWlpaWkvRGVza3RvcC91bmliZXN0LWRvY3Rvci1mcm9udGVuZC92aXRlLXBsdWdpbnMvY29weS1uYXRpdmUtcmVzb3VyY2VzLnRzXCI7aW1wb3J0IHR5cGUgeyBQbHVnaW4gfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXHJcbmltcG9ydCBwcm9jZXNzIGZyb20gJ25vZGU6cHJvY2VzcydcclxuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJ1xyXG5cclxuLyoqXHJcbiAqIFx1NTM5Rlx1NzUxRlx1NjNEMlx1NEVGNlx1OEQ0NFx1NkU5MFx1NTkwRFx1NTIzNlx1OTE0RFx1N0Y2RVx1NjNBNVx1NTNFM1xyXG4gKlxyXG4gKiBcdTY4MzlcdTYzNkUgVW5pQXBwIFx1NUI5OFx1NjVCOVx1NjU4N1x1Njg2M1x1RkYxQWh0dHBzOi8vdW5pYXBwLmRjbG91ZC5uZXQuY24vcGx1Z2luL25hdGl2ZS1wbHVnaW4uaHRtbCMlRTYlOUMlQUMlRTUlOUMlQjAlRTYlOEYlOTIlRTQlQkIlQjYtJUU5JTlEJTlFJUU1JTg2JTg1JUU3JUJEJUFFJUU1JThFJTlGJUU3JTk0JTlGJUU2JThGJTkyJUU0JUJCJUI2XHJcbiAqIFx1NjcyQ1x1NTczMFx1NjNEMlx1NEVGNlx1NUU5NFx1OEJFNVx1NUI1OFx1NTBBOFx1NTcyOFx1OTg3OVx1NzZFRVx1NjgzOVx1NzZFRVx1NUY1NVx1NzY4NCBuYXRpdmVwbHVnaW5zIFx1NzZFRVx1NUY1NVx1NEUwQlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBDb3B5TmF0aXZlUmVzb3VyY2VzT3B0aW9ucyB7XHJcbiAgLyoqIFx1NjYyRlx1NTQyNlx1NTQyRlx1NzUyOFx1NjNEMlx1NEVGNiAqL1xyXG4gIGVuYWJsZT86IGJvb2xlYW5cclxuICAvKipcclxuICAgKiBcdTZFOTBcdTc2RUVcdTVGNTVcdThERUZcdTVGODRcdUZGMENcdTc2RjhcdTVCRjlcdTRFOEVcdTk4NzlcdTc2RUVcdTY4MzlcdTc2RUVcdTVGNTVcclxuICAgKiBcdTlFRDhcdThCQTRcdTRFM0EgJ25hdGl2ZXBsdWdpbnMnXHVGRjBDXHU3QjI2XHU1NDA4IFVuaUFwcCBcdTVCOThcdTY1QjlcdTg5QzRcdTgzMDNcclxuICAgKiBAc2VlIGh0dHBzOi8vdW5pYXBwLmRjbG91ZC5uZXQuY24vcGx1Z2luL25hdGl2ZS1wbHVnaW4uaHRtbCMlRTYlOUMlQUMlRTUlOUMlQjAlRTYlOEYlOTIlRTQlQkIlQjYtJUU5JTlEJTlFJUU1JTg2JTg1JUU3JUJEJUFFJUU1JThFJTlGJUU3JTk0JTlGJUU2JThGJTkyJUU0JUJCJUI2XHJcbiAgICovXHJcbiAgc291cmNlRGlyPzogc3RyaW5nXHJcbiAgLyoqXHJcbiAgICogXHU3NkVFXHU2ODA3XHU3NkVFXHU1RjU1XHU1NDBEXHU3OUYwXHVGRjBDXHU2Nzg0XHU1RUZBXHU1NDBFXHU1NzI4IGRpc3QgXHU3NkVFXHU1RjU1XHU0RTJEXHU3Njg0XHU2NTg3XHU0RUY2XHU1OTM5XHU1NDBEXHJcbiAgICogXHU5RUQ4XHU4QkE0XHU0RTNBICduYXRpdmVwbHVnaW5zJ1x1RkYwQ1x1NEUwRVx1NkU5MFx1NzZFRVx1NUY1NVx1NEZERFx1NjMwMVx1NEUwMFx1ODFGNFxyXG4gICAqL1xyXG4gIHRhcmdldERpck5hbWU/OiBzdHJpbmdcclxuICAvKiogXHU2NjJGXHU1NDI2XHU2NjNFXHU3OTNBXHU4QkU2XHU3RUM2XHU2NUU1XHU1RkQ3XHVGRjBDXHU0RkJGXHU0RThFXHU4QzAzXHU4QkQ1XHU1NDhDXHU3NkQxXHU2M0E3XHU1OTBEXHU1MjM2XHU4RkM3XHU3QTBCICovXHJcbiAgdmVyYm9zZT86IGJvb2xlYW5cclxuICAvKiogXHU4MUVBXHU1QjlBXHU0RTQ5XHU2NUU1XHU1RkQ3XHU1MjREXHU3RjAwXHVGRjBDXHU3NTI4XHU0RThFXHU1MzNBXHU1MjA2XHU0RTBEXHU1NDBDXHU2M0QyXHU0RUY2XHU3Njg0XHU2NUU1XHU1RkQ3XHU4RjkzXHU1MUZBICovXHJcbiAgbG9nUHJlZml4Pzogc3RyaW5nXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBcdTlFRDhcdThCQTRcdTkxNERcdTdGNkVcclxuICpcclxuICogXHU2ODM5XHU2MzZFIFVuaUFwcCBcdTVCOThcdTY1QjlcdTY1ODdcdTY4NjNcdTg5QzRcdTgzMDNcdThCQkVcdTdGNkVcdTlFRDhcdThCQTRcdTUwM0NcdUZGMUFcclxuICogLSBzb3VyY2VEaXI6ICduYXRpdmVwbHVnaW5zJyAtIFx1N0IyNlx1NTQwOFx1NUI5OFx1NjVCOVx1NjcyQ1x1NTczMFx1NjNEMlx1NEVGNlx1NUI1OFx1NTBBOFx1ODlDNFx1ODMwM1xyXG4gKiAtIHRhcmdldERpck5hbWU6ICduYXRpdmVwbHVnaW5zJyAtIFx1Njc4NFx1NUVGQVx1NTQwRVx1NEZERFx1NjMwMVx1NzZGOFx1NTQwQ1x1NzY4NFx1NzZFRVx1NUY1NVx1N0VEM1x1Njc4NFxyXG4gKi9cclxuY29uc3QgREVGQVVMVF9PUFRJT05TOiBSZXF1aXJlZDxDb3B5TmF0aXZlUmVzb3VyY2VzT3B0aW9ucz4gPSB7XHJcbiAgZW5hYmxlOiB0cnVlLFxyXG4gIHNvdXJjZURpcjogJ25hdGl2ZXBsdWdpbnMnLFxyXG4gIHRhcmdldERpck5hbWU6ICduYXRpdmVwbHVnaW5zJyxcclxuICB2ZXJib3NlOiB0cnVlLFxyXG4gIGxvZ1ByZWZpeDogJ1tjb3B5LW5hdGl2ZS1yZXNvdXJjZXNdJyxcclxufVxyXG5cclxuLyoqXHJcbiAqIFVuaUFwcCBcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdThENDRcdTZFOTBcdTU5MERcdTUyMzZcdTYzRDJcdTRFRjZcclxuICpcclxuICogXHU1MjlGXHU4MEZEXHU4QkY0XHU2NjBFXHVGRjFBXHJcbiAqIDEuIFx1ODlFM1x1NTFCMyBVbmlBcHAgXHU0RjdGXHU3NTI4XHU2NzJDXHU1NzMwXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU2NUY2XHVGRjBDXHU2MjUzXHU1MzA1XHU1NDBFXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU4RDQ0XHU2RTkwXHU2MjdFXHU0RTBEXHU1MjMwXHU3Njg0XHU5NUVFXHU5ODk4XHJcbiAqIDIuIFx1NUMwNlx1OTg3OVx1NzZFRVx1NjgzOVx1NzZFRVx1NUY1NVx1NEUwQlx1NzY4NCBuYXRpdmVwbHVnaW5zIFx1NzZFRVx1NUY1NVx1NTkwRFx1NTIzNlx1NTIzMFx1Njc4NFx1NUVGQVx1OEY5M1x1NTFGQVx1NzZFRVx1NUY1NVx1NEUyRFxyXG4gKiAzLiBcdTY1MkZcdTYzMDEgQW5kcm9pZCBcdTU0OEMgaU9TIFx1NUU3M1x1NTNGMFx1NzY4NFx1NTM5Rlx1NzUxRlx1NjNEMlx1NEVGNlx1OEQ0NFx1NkU5MFx1NTkwRFx1NTIzNlxyXG4gKiA0LiBcdTRFQzVcdTU3MjggYXBwIFx1NUU3M1x1NTNGMFx1Njc4NFx1NUVGQVx1NjVGNlx1NzUxRlx1NjU0OFx1RkYwQ1x1NTE3Nlx1NEVENlx1NUU3M1x1NTNGMFx1RkYwOEg1XHUzMDAxXHU1QzBGXHU3QTBCXHU1RThGXHVGRjA5XHU0RTBEXHU2MjY3XHU4ODRDXHJcbiAqXHJcbiAqIFx1NEY3Rlx1NzUyOFx1NTczQVx1NjY2Rlx1RkYxQVxyXG4gKiAtIFx1NEY3Rlx1NzUyOFx1NEU4NiBVbmlBcHAgXHU2NzJDXHU1NzMwXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHVGRjA4XHU5NzVFXHU0RTkxXHU3QUVGXHU2M0QyXHU0RUY2XHVGRjA5XHJcbiAqIC0gXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU1MzA1XHU1NDJCXHU5ODlEXHU1OTE2XHU3Njg0XHU4RDQ0XHU2RTkwXHU2NTg3XHU0RUY2XHVGRjA4XHU1OTgyIC5zbyBcdTVFOTNcdTY1ODdcdTRFRjZcdTMwMDFcdTkxNERcdTdGNkVcdTY1ODdcdTRFRjZcdTdCNDlcdUZGMDlcclxuICogLSBcdTk3MDBcdTg5ODFcdTU3MjhcdTYyNTNcdTUzMDVcdTU0MEVcdTRGRERcdTYzMDFcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdTc2ODRcdTVCOENcdTY1NzRcdTc2RUVcdTVGNTVcdTdFRDNcdTY3ODRcclxuICpcclxuICogXHU1Qjk4XHU2NUI5XHU2NTg3XHU2ODYzXHU1M0MyXHU4MDAzXHVGRjFBXHJcbiAqIEBzZWUgaHR0cHM6Ly91bmlhcHAuZGNsb3VkLm5ldC5jbi9wbHVnaW4vbmF0aXZlLXBsdWdpbi5odG1sIyVFNiU5QyVBQyVFNSU5QyVCMCVFNiU4RiU5MiVFNCVCQiVCNi0lRTklOUQlOUUlRTUlODYlODUlRTclQkQlQUUlRTUlOEUlOUYlRTclOTQlOUYlRTYlOEYlOTIlRTQlQkIlQjZcclxuICogQHNlZSBodHRwczovL3VuaWFwcC5kY2xvdWQubmV0LmNuL3R1dG9yaWFsL252dWUtYXBpLmh0bWwjZG9tXHJcbiAqXHJcbiAqIEBwYXJhbSBvcHRpb25zIFx1NjNEMlx1NEVGNlx1OTE0RFx1N0Y2RVx1OTAwOVx1OTg3OVxyXG4gKiBAcmV0dXJucyBWaXRlIFx1NjNEMlx1NEVGNlx1NUJGOVx1OEM2MVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlOYXRpdmVSZXNvdXJjZXMob3B0aW9uczogQ29weU5hdGl2ZVJlc291cmNlc09wdGlvbnMgPSB7fSk6IFBsdWdpbiB7XHJcbiAgY29uc3QgY29uZmlnID0geyAuLi5ERUZBVUxUX09QVElPTlMsIC4uLm9wdGlvbnMgfVxyXG5cclxuICAvLyBcdTU5ODJcdTY3OUNcdTYzRDJcdTRFRjZcdTg4QUJcdTc5ODFcdTc1MjhcdUZGMENcdThGRDRcdTU2REVcdTRFMDBcdTRFMkFcdTdBN0FcdTYzRDJcdTRFRjZcclxuICBpZiAoIWNvbmZpZy5lbmFibGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6ICdjb3B5LW5hdGl2ZS1yZXNvdXJjZXMtZGlzYWJsZWQnLFxyXG4gICAgICBhcHBseTogJ2J1aWxkJyxcclxuICAgICAgd3JpdGVCdW5kbGUoKSB7XHJcbiAgICAgICAgLy8gXHU2M0QyXHU0RUY2XHU1REYyXHU3OTgxXHU3NTI4XHVGRjBDXHU0RTBEXHU2MjY3XHU4ODRDXHU0RUZCXHU0RjU1XHU2NENEXHU0RjVDXHJcbiAgICAgIH0sXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogJ2NvcHktbmF0aXZlLXJlc291cmNlcycsXHJcbiAgICBhcHBseTogJ2J1aWxkJywgLy8gXHU1M0VBXHU1NzI4XHU2Nzg0XHU1RUZBXHU2NUY2XHU1RTk0XHU3NTI4XHJcbiAgICBlbmZvcmNlOiAncG9zdCcsIC8vIFx1NTcyOFx1NTE3Nlx1NEVENlx1NjNEMlx1NEVGNlx1NjI2N1x1ODg0Q1x1NUI4Q1x1NkJENVx1NTQwRVx1NjI2N1x1ODg0Q1xyXG5cclxuICAgIGFzeW5jIHdyaXRlQnVuZGxlKCkge1xyXG4gICAgICBjb25zdCB7IHNvdXJjZURpciwgdGFyZ2V0RGlyTmFtZSwgdmVyYm9zZSwgbG9nUHJlZml4IH0gPSBjb25maWdcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgLy8gXHU4M0I3XHU1M0Q2XHU5ODc5XHU3NkVFXHU2ODM5XHU3NkVFXHU1RjU1XHU4REVGXHU1Rjg0XHJcbiAgICAgICAgY29uc3QgcHJvamVjdFJvb3QgPSBwcm9jZXNzLmN3ZCgpXHJcblxyXG4gICAgICAgIC8vIFx1Njc4NFx1NUVGQVx1NkU5MFx1NzZFRVx1NUY1NVx1N0VERFx1NUJGOVx1OERFRlx1NUY4NFx1RkYwOFx1OTg3OVx1NzZFRVx1NjgzOVx1NzZFRVx1NUY1NVx1NEUwQlx1NzY4NCBuYXRpdmVwbHVnaW5zIFx1NzZFRVx1NUY1NVx1RkYwOVxyXG4gICAgICAgIGNvbnN0IHNvdXJjZVBhdGggPSBwYXRoLnJlc29sdmUocHJvamVjdFJvb3QsIHNvdXJjZURpcilcclxuXHJcbiAgICAgICAgLy8gXHU2Nzg0XHU1RUZBXHU3NkVFXHU2ODA3XHU4REVGXHU1Rjg0XHVGRjFBZGlzdC9bYnVpbGR8ZGV2XS9bcGxhdGZvcm1dL25hdGl2ZXBsdWdpbnNcclxuICAgICAgICAvLyBidWlsZE1vZGU6ICdidWlsZCcgKFx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4MykgXHU2MjE2ICdkZXYnIChcdTVGMDBcdTUzRDFcdTczQUZcdTU4ODMpXHJcbiAgICAgICAgLy8gcGxhdGZvcm06ICdhcHAnIChBcHBcdTVFNzNcdTUzRjApIFx1NjIxNlx1NTE3Nlx1NEVENlx1NUU3M1x1NTNGMFx1NjgwN1x1OEJDNlxyXG4gICAgICAgIGNvbnN0IGJ1aWxkTW9kZSA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgPyAnYnVpbGQnIDogJ2RldidcclxuICAgICAgICBjb25zdCBwbGF0Zm9ybSA9IHByb2Nlc3MuZW52LlVOSV9QTEFURk9STSB8fCAnYXBwJ1xyXG4gICAgICAgIGNvbnN0IHRhcmdldFBhdGggPSBwYXRoLnJlc29sdmUoXHJcbiAgICAgICAgICBwcm9qZWN0Um9vdCxcclxuICAgICAgICAgICdkaXN0JyxcclxuICAgICAgICAgIGJ1aWxkTW9kZSxcclxuICAgICAgICAgIHBsYXRmb3JtLFxyXG4gICAgICAgICAgdGFyZ2V0RGlyTmFtZSxcclxuICAgICAgICApXHJcblxyXG4gICAgICAgIC8vIFx1NjhDMFx1NjdFNVx1NkU5MFx1NzZFRVx1NUY1NVx1NjYyRlx1NTQyNlx1NUI1OFx1NTcyOFxyXG4gICAgICAgIC8vIFx1NTk4Mlx1Njc5Q1x1NEUwRFx1NUI1OFx1NTcyOCBuYXRpdmVwbHVnaW5zIFx1NzZFRVx1NUY1NVx1RkYwQ1x1OEJGNFx1NjYwRVx1OTg3OVx1NzZFRVx1NkNBMVx1NjcwOVx1NEY3Rlx1NzUyOFx1NjcyQ1x1NTczMFx1NTM5Rlx1NzUxRlx1NjNEMlx1NEVGNlxyXG4gICAgICAgIGNvbnN0IHNvdXJjZUV4aXN0cyA9IGF3YWl0IGZzLnBhdGhFeGlzdHMoc291cmNlUGF0aClcclxuICAgICAgICBpZiAoIXNvdXJjZUV4aXN0cykge1xyXG4gICAgICAgICAgaWYgKHZlcmJvc2UpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGAke2xvZ1ByZWZpeH0gXHU2RTkwXHU3NkVFXHU1RjU1XHU0RTBEXHU1QjU4XHU1NzI4XHVGRjBDXHU4REYzXHU4RkM3XHU1OTBEXHU1MjM2XHU2NENEXHU0RjVDYClcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGAke2xvZ1ByZWZpeH0gXHU2RTkwXHU3NkVFXHU1RjU1XHU4REVGXHU1Rjg0OiAke3NvdXJjZVBhdGh9YClcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGAke2xvZ1ByZWZpeH0gXHU1OTgyXHU5NzAwXHU0RjdGXHU3NTI4XHU2NzJDXHU1NzMwXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHVGRjBDXHU4QkY3XHU1NzI4XHU5ODc5XHU3NkVFXHU2ODM5XHU3NkVFXHU1RjU1XHU1MjFCXHU1RUZBIG5hdGl2ZXBsdWdpbnMgXHU3NkVFXHU1RjU1YClcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGAke2xvZ1ByZWZpeH0gXHU1RTc2XHU2MzA5XHU3MTY3XHU1Qjk4XHU2NUI5XHU2NTg3XHU2ODYzXHU2NTNFXHU1MTY1XHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU2NTg3XHU0RUY2YClcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGAke2xvZ1ByZWZpeH0gXHU1M0MyXHU4MDAzOiBodHRwczovL3VuaWFwcC5kY2xvdWQubmV0LmNuL3BsdWdpbi9uYXRpdmUtcGx1Z2luLmh0bWxgKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBcdTY4QzBcdTY3RTVcdTZFOTBcdTc2RUVcdTVGNTVcdTY2MkZcdTU0MjZcdTRFM0FcdTdBN0FcclxuICAgICAgICAvLyBcdTU5ODJcdTY3OUNcdTc2RUVcdTVGNTVcdTVCNThcdTU3MjhcdTRGNDZcdTRFM0FcdTdBN0FcdUZGMENcdTRFNUZcdThERjNcdThGQzdcdTU5MERcdTUyMzZcdTY0Q0RcdTRGNUNcclxuICAgICAgICBjb25zdCBzb3VyY2VGaWxlcyA9IGF3YWl0IGZzLnJlYWRkaXIoc291cmNlUGF0aClcclxuICAgICAgICBpZiAoc291cmNlRmlsZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICBpZiAodmVyYm9zZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bG9nUHJlZml4fSBcdTZFOTBcdTc2RUVcdTVGNTVcdTRFM0FcdTdBN0FcdUZGMENcdThERjNcdThGQzdcdTU5MERcdTUyMzZcdTY0Q0RcdTRGNUNgKVxyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bG9nUHJlZml4fSBcdTZFOTBcdTc2RUVcdTVGNTVcdThERUZcdTVGODQ6ICR7c291cmNlUGF0aH1gKVxyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bG9nUHJlZml4fSBcdThCRjdcdTU3MjggbmF0aXZlcGx1Z2lucyBcdTc2RUVcdTVGNTVcdTRFMkRcdTY1M0VcdTUxNjVcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdTY1ODdcdTRFRjZgKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBcdTc4NkVcdTRGRERcdTc2RUVcdTY4MDdcdTc2RUVcdTVGNTVcdTUzQ0FcdTUxNzZcdTcyMzZcdTc2RUVcdTVGNTVcdTVCNThcdTU3MjhcclxuICAgICAgICBhd2FpdCBmcy5lbnN1cmVEaXIodGFyZ2V0UGF0aClcclxuXHJcbiAgICAgICAgaWYgKHZlcmJvc2UpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGAke2xvZ1ByZWZpeH0gXHU1RjAwXHU1OUNCXHU1OTBEXHU1MjM2IFVuaUFwcCBcdTY3MkNcdTU3MzBcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjYuLi5gKVxyXG4gICAgICAgICAgY29uc29sZS5sb2coYCR7bG9nUHJlZml4fSBcdTZFOTBcdTc2RUVcdTVGNTU6ICR7c291cmNlUGF0aH1gKVxyXG4gICAgICAgICAgY29uc29sZS5sb2coYCR7bG9nUHJlZml4fSBcdTc2RUVcdTY4MDdcdTc2RUVcdTVGNTU6ICR7dGFyZ2V0UGF0aH1gKVxyXG4gICAgICAgICAgY29uc29sZS5sb2coYCR7bG9nUHJlZml4fSBcdTY3ODRcdTVFRkFcdTZBMjFcdTVGMEY6ICR7YnVpbGRNb2RlfWApXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJHtsb2dQcmVmaXh9IFx1NzZFRVx1NjgwN1x1NUU3M1x1NTNGMDogJHtwbGF0Zm9ybX1gKVxyXG4gICAgICAgICAgY29uc29sZS5sb2coYCR7bG9nUHJlZml4fSBcdTUzRDFcdTczQjAgJHtzb3VyY2VGaWxlcy5sZW5ndGh9IFx1NEUyQVx1NTM5Rlx1NzUxRlx1NjNEMlx1NEVGNlx1NjU4N1x1NEVGNi9cdTc2RUVcdTVGNTVgKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gXHU2MjY3XHU4ODRDXHU2NTg3XHU0RUY2XHU1OTBEXHU1MjM2XHU2NENEXHU0RjVDXHJcbiAgICAgICAgLy8gXHU1QzA2XHU2NTc0XHU0RTJBIG5hdGl2ZXBsdWdpbnMgXHU3NkVFXHU1RjU1XHU1OTBEXHU1MjM2XHU1MjMwXHU2Nzg0XHU1RUZBXHU4RjkzXHU1MUZBXHU3NkVFXHU1RjU1XHJcbiAgICAgICAgYXdhaXQgZnMuY29weShzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCB7XHJcbiAgICAgICAgICBvdmVyd3JpdGU6IHRydWUsIC8vIFx1ODk4Nlx1NzZENlx1NURGMlx1NUI1OFx1NTcyOFx1NzY4NFx1NjU4N1x1NEVGNlx1RkYwQ1x1Nzg2RVx1NEZERFx1NEY3Rlx1NzUyOFx1NjcwMFx1NjVCMFx1NzI0OFx1NjcyQ1xyXG4gICAgICAgICAgZXJyb3JPbkV4aXN0OiBmYWxzZSwgLy8gXHU1OTgyXHU2NzlDXHU3NkVFXHU2ODA3XHU2NTg3XHU0RUY2XHU1QjU4XHU1NzI4XHU0RTBEXHU2MkE1XHU5NTE5XHJcbiAgICAgICAgICBwcmVzZXJ2ZVRpbWVzdGFtcHM6IHRydWUsIC8vIFx1NEZERFx1NjMwMVx1NjU4N1x1NEVGNlx1NzY4NFx1NjVGNlx1OTVGNFx1NjIzM1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGlmICh2ZXJib3NlKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJHtsb2dQcmVmaXh9IFx1MjcwNSBVbmlBcHAgXHU2NzJDXHU1NzMwXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU1OTBEXHU1MjM2XHU1QjhDXHU2MjEwYClcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGAke2xvZ1ByZWZpeH0gXHU1REYyXHU2MjEwXHU1MjlGXHU1OTBEXHU1MjM2ICR7c291cmNlRmlsZXMubGVuZ3RofSBcdTRFMkFcdTY1ODdcdTRFRjYvXHU3NkVFXHU1RjU1XHU1MjMwXHU2Nzg0XHU1RUZBXHU3NkVFXHU1RjU1YClcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGAke2xvZ1ByZWZpeH0gXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU3M0IwXHU1NzI4XHU1M0VGXHU0RUU1XHU1NzI4IEFwcCBcdTRFMkRcdTZCNjNcdTVFMzhcdTRGN0ZcdTc1MjhgKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGAke2NvbmZpZy5sb2dQcmVmaXh9IFx1Mjc0QyBcdTU5MERcdTUyMzYgVW5pQXBwIFx1NjcyQ1x1NTczMFx1NTM5Rlx1NzUxRlx1NjNEMlx1NEVGNlx1NTkzMVx1OEQyNTpgLCBlcnJvcilcclxuICAgICAgICBjb25zb2xlLmVycm9yKGAke2NvbmZpZy5sb2dQcmVmaXh9IFx1OTUxOVx1OEJFRlx1OEJFNlx1NjBDNTpgLCBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpXHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgJHtjb25maWcubG9nUHJlZml4fSBcdThCRjdcdTY4QzBcdTY3RTVcdTZFOTBcdTc2RUVcdTVGNTVcdTY3NDNcdTk2NTBcdTU0OENcdTc4QzFcdTc2RDhcdTdBN0FcdTk1RjRgKVxyXG4gICAgICAgIC8vIFx1NEUwRFx1NjI5Qlx1NTFGQVx1OTUxOVx1OEJFRlx1RkYwQ1x1OTA3Rlx1NTE0RFx1NUY3MVx1NTRDRFx1NjU3NFx1NEUyQVx1Njc4NFx1NUVGQVx1OEZDN1x1N0EwQlx1RkYwQ1x1NEY0Nlx1NEYxQVx1OEJCMFx1NUY1NVx1OEJFNlx1N0VDNlx1NzY4NFx1OTUxOVx1OEJFRlx1NEZFMVx1NjA2RlxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFx1NTIxQlx1NUVGQSBVbmlBcHAgXHU2NzJDXHU1NzMwXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU4RDQ0XHU2RTkwXHU1OTBEXHU1MjM2XHU2M0QyXHU0RUY2XHU3Njg0XHU0RkJGXHU2Mzc3XHU1MUZEXHU2NTcwXHJcbiAqXHJcbiAqIFx1OEZEOVx1NjYyRlx1NEUwMFx1NEUyQVx1NEZCRlx1NjM3N1x1NzY4NFx1NURFNVx1NTM4Mlx1NTFGRFx1NjU3MFx1RkYwQ1x1NzUyOFx1NEU4RVx1NUZFQlx1OTAxRlx1NTIxQlx1NUVGQVx1NjNEMlx1NEVGNlx1NUI5RVx1NEY4QlxyXG4gKiBcdTcyNzlcdTUyMkJcdTkwMDJcdTc1MjhcdTRFOEVcdTU3Mjggdml0ZS5jb25maWcudHMgXHU0RTJEXHU4RkRCXHU4ODRDXHU2NzYxXHU0RUY2XHU2MDI3XHU2M0QyXHU0RUY2XHU5MTREXHU3RjZFXHJcbiAqXHJcbiAqIFx1NEY3Rlx1NzUyOFx1NzkzQVx1NEY4Qlx1RkYxQVxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIC8vIFx1NTcyOCB2aXRlLmNvbmZpZy50cyBcdTRFMkRcclxuICogcGx1Z2luczogW1xyXG4gKiAgIC8vIFx1NEVDNVx1NTcyOCBhcHAgXHU1RTczXHU1M0YwXHU0RTE0XHU1NDJGXHU3NTI4XHU2NUY2XHU3NTFGXHU2NTQ4XHJcbiAqICAgVU5JX1BMQVRGT1JNID09PSAnYXBwJ1xyXG4gKiAgICAgPyBjcmVhdGVDb3B5TmF0aXZlUmVzb3VyY2VzUGx1Z2luKFxyXG4gKiAgICAgICAgIFZJVEVfQ09QWV9OQVRJVkVfUkVTX0VOQUJMRSA9PT0gJ3RydWUnLFxyXG4gKiAgICAgICAgIHsgdmVyYm9zZTogbW9kZSA9PT0gJ2RldmVsb3BtZW50JyB9XHJcbiAqICAgICAgIClcclxuICogICAgIDogbnVsbCxcclxuICogXVxyXG4gKiBgYGBcclxuICpcclxuICogQHBhcmFtIGVuYWJsZSBcdTY2MkZcdTU0MjZcdTU0MkZcdTc1MjhcdTYzRDJcdTRFRjZcdUZGMENcdTkwMUFcdTVFMzhcdTkwMUFcdThGQzdcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcdTYzQTdcdTUyMzZcclxuICogQHBhcmFtIG9wdGlvbnMgXHU1MTc2XHU0RUQ2XHU5MTREXHU3RjZFXHU5MDA5XHU5ODc5XHVGRjBDXHU0RTBEXHU1MzA1XHU1NDJCIGVuYWJsZSBcdTVDNUVcdTYwMjdcclxuICogQHJldHVybnMgVml0ZSBcdTYzRDJcdTRFRjZcdTVCRjlcdThDNjFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb3B5TmF0aXZlUmVzb3VyY2VzUGx1Z2luKFxyXG4gIGVuYWJsZTogYm9vbGVhbiA9IHRydWUsXHJcbiAgb3B0aW9uczogT21pdDxDb3B5TmF0aXZlUmVzb3VyY2VzT3B0aW9ucywgJ2VuYWJsZSc+ID0ge30sXHJcbik6IFBsdWdpbiB7XHJcbiAgcmV0dXJuIGNvcHlOYXRpdmVSZXNvdXJjZXMoeyBlbmFibGUsIC4uLm9wdGlvbnMgfSlcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGZlbmd5aWlpaWlcXFxcRGVza3RvcFxcXFx1bmliZXN0LWRvY3Rvci1mcm9udGVuZFxcXFx2aXRlLXBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGZlbmd5aWlpaWlcXFxcRGVza3RvcFxcXFx1bmliZXN0LWRvY3Rvci1mcm9udGVuZFxcXFx2aXRlLXBsdWdpbnNcXFxcc3luYy1tYW5pZmVzdC1wbHVnaW5zLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9mZW5neWlpaWlpL0Rlc2t0b3AvdW5pYmVzdC1kb2N0b3ItZnJvbnRlbmQvdml0ZS1wbHVnaW5zL3N5bmMtbWFuaWZlc3QtcGx1Z2lucy50c1wiO2ltcG9ydCB0eXBlIHsgUGx1Z2luIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IGZzIGZyb20gJ25vZGU6ZnMnXHJcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcclxuaW1wb3J0IHByb2Nlc3MgZnJvbSAnbm9kZTpwcm9jZXNzJ1xyXG5cclxuaW50ZXJmYWNlIE1hbmlmZXN0VHlwZSB7XHJcbiAgJ3BsdXMnPzoge1xyXG4gICAgZGlzdHJpYnV0ZT86IHtcclxuICAgICAgcGx1Z2lucz86IFJlY29yZDxzdHJpbmcsIGFueT5cclxuICAgIH1cclxuICB9XHJcbiAgJ2FwcC1wbHVzJz86IHtcclxuICAgIGRpc3RyaWJ1dGU/OiB7XHJcbiAgICAgIHBsdWdpbnM/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzeW5jTWFuaWZlc3RQbHVnaW4oKTogUGx1Z2luIHtcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogJ3N5bmMtbWFuaWZlc3QnLFxyXG4gICAgYXBwbHk6ICdidWlsZCcsXHJcbiAgICBlbmZvcmNlOiAncG9zdCcsXHJcbiAgICB3cml0ZUJ1bmRsZToge1xyXG4gICAgICBvcmRlcjogJ3Bvc3QnLFxyXG4gICAgICBoYW5kbGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHNyY01hbmlmZXN0UGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnLi9zcmMvbWFuaWZlc3QuanNvbicpXHJcbiAgICAgICAgY29uc3QgZGlzdEFwcFBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJy4vZGlzdC9kZXYvYXBwL21hbmlmZXN0Lmpzb24nKVxyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgLy8gXHU4QkZCXHU1M0Q2XHU2RTkwXHU2NTg3XHU0RUY2XHJcbiAgICAgICAgICBjb25zdCBzcmNNYW5pZmVzdCA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHNyY01hbmlmZXN0UGF0aCwgJ3V0ZjgnKSkgYXMgTWFuaWZlc3RUeXBlXHJcblxyXG4gICAgICAgICAgLy8gXHU3ODZFXHU0RkREXHU3NkVFXHU2ODA3XHU3NkVFXHU1RjU1XHU1QjU4XHU1NzI4XHJcbiAgICAgICAgICBjb25zdCBkaXN0QXBwRGlyID0gcGF0aC5kaXJuYW1lKGRpc3RBcHBQYXRoKVxyXG4gICAgICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGRpc3RBcHBEaXIpKSB7XHJcbiAgICAgICAgICAgIGZzLm1rZGlyU3luYyhkaXN0QXBwRGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIFx1OEJGQlx1NTNENlx1NzZFRVx1NjgwN1x1NjU4N1x1NEVGNlx1RkYwOFx1NTk4Mlx1Njc5Q1x1NUI1OFx1NTcyOFx1RkYwOVxyXG4gICAgICAgICAgbGV0IGRpc3RNYW5pZmVzdDogTWFuaWZlc3RUeXBlID0ge31cclxuICAgICAgICAgIGlmIChmcy5leGlzdHNTeW5jKGRpc3RBcHBQYXRoKSkge1xyXG4gICAgICAgICAgICBkaXN0TWFuaWZlc3QgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhkaXN0QXBwUGF0aCwgJ3V0ZjgnKSlcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBcdTU5ODJcdTY3OUNcdTZFOTBcdTY1ODdcdTRFRjZcdTVCNThcdTU3MjggcGx1Z2luc1xyXG4gICAgICAgICAgaWYgKHNyY01hbmlmZXN0WydhcHAtcGx1cyddPy5kaXN0cmlidXRlPy5wbHVnaW5zKSB7XHJcbiAgICAgICAgICAgIC8vIFx1Nzg2RVx1NEZERFx1NzZFRVx1NjgwN1x1NjU4N1x1NEVGNlx1NEUyRFx1NjcwOVx1NUZDNVx1ODk4MVx1NzY4NFx1NUJGOVx1OEM2MVx1N0VEM1x1Njc4NFxyXG4gICAgICAgICAgICBpZiAoIWRpc3RNYW5pZmVzdC5wbHVzKVxyXG4gICAgICAgICAgICAgIGRpc3RNYW5pZmVzdC5wbHVzID0ge31cclxuICAgICAgICAgICAgaWYgKCFkaXN0TWFuaWZlc3QucGx1cy5kaXN0cmlidXRlKVxyXG4gICAgICAgICAgICAgIGRpc3RNYW5pZmVzdC5wbHVzLmRpc3RyaWJ1dGUgPSB7fVxyXG5cclxuICAgICAgICAgICAgLy8gXHU1OTBEXHU1MjM2IHBsdWdpbnMgXHU1MTg1XHU1QkI5XHJcbiAgICAgICAgICAgIGRpc3RNYW5pZmVzdC5wbHVzLmRpc3RyaWJ1dGUucGx1Z2lucyA9IHNyY01hbmlmZXN0WydhcHAtcGx1cyddLmRpc3RyaWJ1dGUucGx1Z2luc1xyXG5cclxuICAgICAgICAgICAgLy8gXHU1MTk5XHU1MTY1XHU2NkY0XHU2NUIwXHU1NDBFXHU3Njg0XHU1MTg1XHU1QkI5XHJcbiAgICAgICAgICAgIGZzLndyaXRlRmlsZVN5bmMoZGlzdEFwcFBhdGgsIEpTT04uc3RyaW5naWZ5KGRpc3RNYW5pZmVzdCwgbnVsbCwgMikpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdcdTI3MDUgTWFuaWZlc3QgcGx1Z2lucyBcdTU0MENcdTZCNjVcdTYyMTBcdTUyOUYnKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1x1Mjc0QyBcdTU0MENcdTZCNjUgbWFuaWZlc3QgcGx1Z2lucyBcdTU5MzFcdThEMjU6JywgZXJyb3IpXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxVixPQUFPQSxXQUFVO0FBQ3RXLE9BQU9DLGNBQWE7QUFDcEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sZ0JBQWdCO0FBRXZCLE9BQU8sZ0JBQWdCO0FBRXZCLE9BQU8saUJBQWlCO0FBRXhCLE9BQU8sY0FBYztBQUdyQixPQUFPLGlCQUFpQjtBQUt4QixPQUFPLGtCQUFrQjtBQUV6QixPQUFPLGVBQWU7QUFDdEIsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsa0JBQWtCO0FBQzNCLE9BQU8sWUFBWTtBQUNuQixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLGNBQWMsZUFBZTtBQUN0QyxPQUFPLGlCQUFpQjs7O0FDekI2VixTQUFTLFlBQVk7QUFDMVksT0FBTyxRQUFRO0FBQ2YsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sYUFBYTtBQUtwQixTQUFTLGdCQUFnQjtBQUN2QixRQUFNLFdBQVcsUUFBUTtBQUN6QixRQUFNLEVBQUUsYUFBYSxJQUFJLFFB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LFVBQ1IsY0FBYztBQUFBO0FBQUEsVUFFZCxTQUFTLENBQUFDLFVBQVFBLE1BQUssUUFBUSxJQUFJLE9BQU8sSUFBSSxxQkFBcUIsRUFBRSxHQUFHLEVBQUU7QUFBQSxRQUMzRTtBQUFBLE1BQ0YsSUFDQTtBQUFBLElBQ047QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE1BQU0sd0JBQXdCLFNBQVMsQ0FBQyxXQUFXLFVBQVUsSUFBSSxDQUFDO0FBQUEsSUFDcEU7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLFdBQVc7QUFBQTtBQUFBO0FBQUEsTUFHWCxRQUFRO0FBQUE7QUFBQSxNQUVSLFFBQVEsU0FBUyxnQkFBZ0IsUUFBUTtBQUFBLElBQzNDO0FBQUEsRUFDRixDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCIsICJwcm9jZXNzIiwgInBhdGgiLCAicHJvY2VzcyIsICJmcyIsICJwcm9jZXNzIiwgInBhdGgiLCAiZnMiLCAiZnMiLCAicGF0aCIsICJwcm9jZXNzIiwgInBhdGgiLCAicHJvY2VzcyIsICJmcyIsICJwcm9jZXNzIiwgInBhdGgiXQp9Cg==
