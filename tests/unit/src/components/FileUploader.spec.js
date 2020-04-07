import { shallowMount, mount } from '@vue/test-utils'
import FileUploader from '@/components/FileUploader.vue'
import claimingFileSuccess from '../../../../claiming_file_success'
import '../../../../src/fontAwesome'

describe('Renders the correct elements when there is no file uploaded', () => {
  const wrapper = shallowMount(FileUploader, {
    propsData: {
      acceptedFormat: '.json',
      errorMessage: 'upload a valid file',
      file: null,
      validateFile: () => {},
    },
  })
  wrapper.setData({
    showDelete: false,
  })
  it('finds the drag-and-drop element', () => {
    expect(wrapper.contains('[data-test="drag-and-drop"]')).toBe(true)
  })
  it('does not find the upload-text element', () => {
    expect(wrapper.contains('[data-test="upload-text"]')).toBe(true)
  })
  it('does not find the upload-icon element', () => {
    expect(wrapper.contains('[data-test="upload-icon"]')).toBe(true)
  })
  it('finds the success-text element', () => {
    expect(wrapper.contains('[data-test="success-text"]')).toBe(false)
  })
  it('finds the success-icon element', () => {
    expect(wrapper.contains('[data-test="success-icon"]')).toBe(false)
  })
  it('finds the accepted-file-subtitle element', () => {
    expect(wrapper.contains('[data-test="accepted-file-subtitle"]')).toBe(true)
  })
  it('finds the file-name element', () => {
    expect(wrapper.contains('[data-test="file-name"]')).toBe(false)
  })
  it('does not find the delete-icon element', () => {
    expect(wrapper.contains('[data-test="delete-icon"]')).toBe(false)
  })
  it('finds the check-icon" element', () => {
    expect(wrapper.contains('[data-test="check-icon"]')).toBe(false)
  })
  it('does not find the error" element', () => {
    expect(wrapper.contains('[data-test="error"]')).toBe(false)
  })
})

describe('Renders the correct elements when there is a file uploaded', () => {
  const wrapper = shallowMount(FileUploader, {
    propsData: {
      acceptedFormat: '.json',
      errorMessage: 'upload valid file',
      file: claimingFileSuccess,
      validateFile: () => {},
    },
  })
  wrapper.setData({
    showDelete: false,
  })
  it('finds the drag-and-drop element', () => {
    expect(wrapper.contains('[data-test="drag-and-drop"]')).toBe(true)
  })
  it('does not find the upload-text element', () => {
    expect(wrapper.contains('[data-test="upload-text"]')).toBe(false)
  })
  it('does not find the upload-icon element', () => {
    expect(wrapper.contains('[data-test="upload-icon"]')).toBe(false)
  })
  it('finds the success-text element', () => {
    expect(wrapper.contains('[data-test="success-text"]')).toBe(true)
  })
  it('finds the success-icon element', () => {
    expect(wrapper.contains('[data-test="success-icon"]')).toBe(true)
  })
  it('finds the accepted-file-subtitle element', () => {
    expect(wrapper.contains('[data-test="accepted-file-subtitle"]')).toBe(true)
  })
  it('finds the file-name element', () => {
    expect(wrapper.contains('[data-test="file-name"]')).toBe(true)
  })
  it('does not find the delete-icon element', () => {
    expect(wrapper.contains('[data-test="delete-icon"]')).toBe(false)
  })
  it('finds the check-icon" element', () => {
    expect(wrapper.contains('[data-test="check-icon"]')).toBe(true)
  })
  it('does not find the error" element', () => {
    expect(wrapper.contains('[data-test="error"]')).toBe(false)
  })
})

describe('Shows delete file button when showDelete is activated', () => {
  const wrapper = shallowMount(FileUploader, {
    propsData: {
      acceptedFormat: '.json',
      errorMessage: 'upload a valid file',
      file: claimingFileSuccess,
      validateFile: () => {},
    },
  })
  wrapper.setData({
    showDelete: true,
  })
  it('does not find the delete-icon element', () => {
    expect(wrapper.contains('[data-test="delete-icon"]')).toBe(true)
  })
  it('finds the check-icon" element', () => {
    expect(wrapper.contains('[data-test="check-icon"]')).toBe(false)
  })
})

describe('Shows delete file button when showDelete is activated', () => {
  const wrapper = shallowMount(FileUploader, {
    propsData: {
      acceptedFormat: '.json',
      errorMessage: 'upload a valid file',
      file: claimingFileSuccess,
      validateFile: () => {},
    },
  })
  wrapper.setData({
    showDelete: true,
  })
  it('does not find the delete-icon element', () => {
    expect(wrapper.contains('[data-test="delete-icon"]')).toBe(true)
  })
  it('finds the check-icon" element', () => {
    expect(wrapper.contains('[data-test="check-icon"]')).toBe(false)
  })
})

describe('Upload file', () => {
  it('uploads a file', async () => {
    let localImageInput
    let localImageInputFilesGet
    let localImageInputValueGet
    let localImageInputValueSet
    let localImageInputValue = ''

    const wrapper = shallowMount(FileUploader, {
      propsData: {
        acceptedFormat: '.json',
        errorMessage: 'An error',
        file: undefined,
        validateFile: () => true,
      },
    })

    localImageInput = wrapper.find('input[type="file"]')
    localImageInputFilesGet = jest.fn()
    localImageInputValueGet = jest.fn().mockReturnValue(localImageInputValue)
    localImageInputValueSet = jest.fn().mockImplementation(v => {
      localImageInputValue = v
    })
    Object.defineProperty(localImageInput.element, 'files', {
      get: localImageInputFilesGet,
    })

    Object.defineProperty(localImageInput.element, 'value', {
      get: localImageInputValueGet,
      set: localImageInputValueSet,
    })

    localImageInputFilesGet.mockReturnValue([
      new Blob([JSON.stringify(claimingFileSuccess)], { type: 'application/json' }),
    ])

    localImageInput.trigger('change')
  })
})
describe('delete file when click on delete', () => {
  const wrapper = mount(FileUploader)

  wrapper.setData({
    showDelete: false,
    localFile: {},
  })

  it('finds file element', () => {
    expect(wrapper.contains('[data-test="file"]')).toBe(true)
  })
  it('triggers mouseover', () => {
    expect(wrapper.find('[data-test="file"]').trigger('mouseover'))
  })
  it('deletes file', () => {
    expect(wrapper.vm.$data.showDelete).toBe(true)
  })
  it('triggers click', () => {
    expect(wrapper.find('[data-test="delete-icon"]').trigger('click'))
  })
  it('deletes localFile', () => {
    expect(wrapper.vm.$data.localFile).toBe(null)
  })
})
describe('show error when error', () => {
  const wrapper = shallowMount(FileUploader, {
    propsData: {
      acceptedFormat: '.json',
      errorMessage: 'An error',
      file: undefined,
      validateFile: () => false,
    },
  })

  wrapper.setData({
    error: true,
  })

  it('does not find the error" element', () => {
    expect(wrapper.contains('[data-test="error"]')).toBe(true)
  })
  it('does not find the error" element', () => {
    expect(wrapper.contains('[data-test="icon-error"]')).toBe(true)
  })
})