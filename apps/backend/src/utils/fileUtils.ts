import fs from 'fs/promises';
import path from 'path';

/**
 * 确保指定的目录存在。如果目录不存在，则会递归创建它。
 * @param dirPath 要确保存在的目录的路径。
 */
export async function ensureDirExists(dirPath: string): Promise<void> {
  try {
    await fs.access(dirPath);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(dirPath, { recursive: true });
      console.log(`[FileUtils] Directory created: ${dirPath}`);
    } else {
      console.error(`[FileUtils] Error checking directory ${dirPath}:`, error);
      throw error;
    }
  }
}

/**
 * 获取项目根目录。
 * 此文件位于 apps/backend/src/utils/fileUtils.ts
 * @returns 项目根目录的绝对路径。
 */
export function getProjectRootDir(): string {
  // 从当前文件 (__filename) 获取目录 (apps/backend/src/utils)
  // 然后向上导航四层到达项目根目录 (ComfyTavern)
  const currentFileDir = path.dirname(new URL(import.meta.url).pathname);
  if (process.platform === "win32" && currentFileDir.startsWith("/")) {
    // 在 Windows 上，URL.pathname 会以 / 开头，例如 /E:/path，需要移除开头的 /
    // 同时，需要对路径进行解码，以处理非 ASCII 字符（如中文）
    const decodedPath = decodeURIComponent(currentFileDir.substring(1));
    return path.resolve(decodedPath, "../../../..");
  }
  // 对于非 Windows 或路径不以 / 开头的情况，也进行解码
  const decodedPath = decodeURIComponent(currentFileDir);
  return path.resolve(decodedPath, "../../../..");
}

/**
 * 获取项目根目录下 public 目录的路径。
 * @returns public 目录的绝对路径。
 */
export function getPublicDir(): string {
  return path.join(getProjectRootDir(), 'public');
}

/**
 * 获取项目根目录下 logs/executions 目录的路径。
 * @returns logs/executions 目录的绝对路径。
 */
export function getLogDir(): string {
  return path.join(getProjectRootDir(), 'logs', 'executions');
}

/**
 * 获取项目根目录下 library 目录的路径。
 * @returns library 目录的绝对路径。
 */
export function getLibraryBaseDir(): string {
  return path.join(getProjectRootDir(), 'library');
}

/**
 * 获取项目根目录下 templates 目录的路径。
 * @returns templates 目录的绝对路径。
 */
export function getTemplatesDir(): string {
  return path.join(getProjectRootDir(), 'templates');
}

/**
 * 获取项目根目录下 userData 目录的路径。
 * @returns userData 目录的绝对路径。
 */
export function getUserDataRoot(): string {
  return path.join(getProjectRootDir(), 'userData');
}

/**
 * 获取项目根目录下 data 目录的路径 (用于存放数据库等)。
 * @returns data 目录的绝对路径。
 */
export function getDataDir(): string {
  return path.join(getProjectRootDir(), 'data');
}

/**
 * 获取项目根目录下 config 目录的路径 (用于存放全局配置文件)。
 * @returns config 目录的绝对路径。
 */
export function getConfigDir(): string {
  return path.join(getProjectRootDir(), 'config');
}