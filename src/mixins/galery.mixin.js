import 'viewerjs/dist/viewer.css'
import { api as viewerApi } from "v-viewer"

export default {
  data: () => ({}),
  methods: {
    showImage(images = [], index = 0, className = "", zoom) {
      if (!images.length) return;

      window.viewerApi = viewerApi({
        options: {
          className,
          navbar: false,
          fullscreen: false,
          title: false,
          toolbar: false,
          rotatable: false,
          initialViewIndex: index
        },
        images: [...images]
      })
      if (zoom)
      setTimeout(() => {
        window.viewerApi.zoomTo(zoom)
      }, 1000);
    }
  }
}