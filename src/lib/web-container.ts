import { WebContainer } from '@webcontainer/api'

let webContainerInstance: WebContainer

export async function getWebContainerInstance() {
  if (!webContainerInstance) {
    console.log('Criando web container')
    webContainerInstance = await WebContainer.boot()
  }

  return webContainerInstance
}