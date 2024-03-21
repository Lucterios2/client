<script>
import AbstractEventComp from '@/components/AbstractEventComp.vue'
import ButtonsBar from '@/libs/ButtonsBar.vue'
import { Stringformat, blobToData, convertToBytes } from '@/libs/convert'
import JSZip from 'jszip'
export default {
  name: 'UploadComp',
  extends: AbstractEventComp,
  components: { ButtonsBar },
  data: () => ({
    selected_files: null,
    selectedFile: null,
    isLoading: false,
    isPhotoTaken: false,
    show_camera: false
  }),
  computed: {
    active_miniature() {
      return this.selectedFile && this.selectedFile.type.split('/')[0] === 'image'
    },
    files_accepted() {
      if (Array.isArray(this.component.filter)) {
        return this.component.filter.join(',')
      } else {
        return '*'
      }
    },
    check() {
      return [this.check_max_size]
    },
    act_camera_list() {
      return [
        {
          id: 'ok',
          text: this.$t('ok'),
          short_icon: 'mdi:mdi-camera',
          close: 1
        },
        {
          id: 'cancel',
          text: this.$t('cancel'),
          short_icon: 'mdi:mdi-close',
          close: 1
        }
      ]
    }
  },
  methods: {
    async getFileContentBase64() {
      this.current_value = null
      if (this.selectedFile != null) {
        if (this.component.compress) {
          var zip = new JSZip()
          zip.file(this.name, this.selectedFile)
          const blobResult = await zip.generateAsync({ type: 'blob' })
          this.current_value = await this.getEncodeFile(blobResult)
        } else {
          this.current_value = await this.getEncodeFile(this.selectedFile)
        }
      }
    },
    async getEncodeFile(fileToSend) {
      if (this.component.http_file) {
        return fileToSend
      } else {
        return await blobToData(fileToSend)
      }
    },
    add_parameters(params) {
      if (this.selectedFile && this.getVisible() && this.getEnabled()) {
        params[this.component.name] = this.current_value
        if (this.component.compress) {
          params[this.component.name + '_FILENAME'] = this.selectedFile.name
        }
      }
    },
    check_max_size() {
      if (this.selectedFile) {
        if (this.selectedFile.size > this.component.maxsize) {
          var unit = 'o'
          var size = this.component.maxsize
          if (size > 1024) {
            size = size / 1024
            unit = 'ko'
            if (size > 1024) {
              size = size / 1024
              unit = 'Mo'
            }
          }
          const text = this.$t('Impossible: the file must be less than %0 %1')
          return Stringformat(text, [size.toFixed(1), unit])
        }
      }
      return true
    },
    load_miniature() {
      if (this.active_miniature) {
        const miniature = this.$refs.miniature
        if (this.selectedFile) {
          const fileimg = new FileReader()
          fileimg.onload = function (img) {
            miniature.src = img.target.result
          }
          fileimg.readAsDataURL(this.selectedFile)
        } else {
          miniature.src = ''
        }
      }
    },
    selectFile(event) {
      if (event.target.files) {
        this.selectedFile = event.target.files[0]
      } else {
        this.selectedFile = null
      }
      this.load_miniature()
      this.getFileContentBase64()
    },
    take_picture() {
      this.show_camera = true
      this.isLoading = true
      const constraints = (window.constraints = { audio: false, video: true })
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.$refs.camera.srcObject = stream
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
          alert(this.$t("May the browser didn't support or there is some errors."))
        })
    },
    close_camera() {
      this.show_camera = false
      let tracks = this.$refs.camera.srcObject.getTracks()
      tracks.forEach((track) => {
        track.stop()
      })
    },
    action_camera(act) {
      if (act.id == 'ok') {
        this.isPhotoTaken = !this.isPhotoTaken
        const context = this.$refs.canvas.getContext('2d')
        context.drawImage(this.$refs.camera, 0, 0, 400, 337.5)
        const today = new Date()
        const imageData = this.$refs.canvas
          .toDataURL('image/png')
          .replace('data:image/png;base64,', '')
        const imageName = Stringformat('image_%0-%1-%2_%3-%4.png', [
          today.getFullYear(),
          (today.getMonth() + 1).toString(),
          today.getDate().toString(),
          today.getHours().toString(),
          today.getMinutes().toString()
        ])
        this.selectedFile = new File(convertToBytes(window.atob(imageData)), imageName, {
          type: 'image/png'
        })
        this.selected_files = [this.selectedFile]
        this.load_miniature()
        this.getFileContentBase64()
      }
    }
  }
}
</script>

<template>
  <v-row>
    <v-col cols="max">
      <v-file-input
        clearable
        show-size
        :rules="check"
        :accept="files_accepted"
        :label="component.description"
        :model-value="selected_files"
        @change="selectFile"
        @click:clear="selectFile"
      />
    </v-col>
    <v-col cols="2" v-show="active_miniature">
      <img ref="miniature" class="miniature" />
    </v-col>
    <v-col cols="2" v-if="component.withcam">
      <v-btn size="x-small" icon="mdi:mdi-camera" @click="take_picture"></v-btn>
      <v-dialog v-model="show_camera" persistent max-width="450px">
        <v-card>
          <v-card-title class="bg-grey-darken-1"> {{ $t('Picture') }} </v-card-title>
          <v-card-text>
            <v-progress-linear
              v-show="isLoading"
              color="dark-blue"
              indeterminate
              :height="5"
            ></v-progress-linear>
            <div v-show="!isLoading">
              <video
                v-show="!isPhotoTaken"
                ref="camera"
                :width="400"
                height="337.5"
                autoplay
              ></video>
              <canvas v-show="isPhotoTaken" ref="canvas" :width="400" height="337.5"></canvas>
            </div>
          </v-card-text>
          <ButtonsBar
            :actions="act_camera_list"
            @clickaction="action_camera"
            @close="close_camera"
          />
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<style scoped>
.miniature {
  margin: 5px 0px;
  width: 40px;
}
</style>
