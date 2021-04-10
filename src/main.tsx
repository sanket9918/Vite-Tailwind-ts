import { render } from 'preact'
import App from './app'
import './style/index.css'
import { registerSW } from 'virtual:pwa-register'


const updateSW = registerSW({
    onNeedRefresh() {
        confirm("We need a refresh")
    },
    onOfflineReady() {
        alert('You are now offline.We are working from cache.')
    }
})

updateSW()
render(<App />, document.getElementById('app')!)
