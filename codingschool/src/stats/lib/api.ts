import { PACKAGE_NAME } from '../data/config'
import type { DailyDownload, DownloadRangeResponse } from '../types'

export async function fetchDownloads(
  start: string,
  end: string,
  signal?: AbortSignal,
): Promise<DailyDownload[]> {
  const url = `https://api.npmjs.org/downloads/range/${start}:${end}/${PACKAGE_NAME}`
  const res = await fetch(url, { signal })
  if (!res.ok) {
    throw new Error(`npm API responded with ${res.status}`)
  }
  const json = (await res.json()) as DownloadRangeResponse
  return json.downloads
}
