import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppButton from '../AppButton.vue'

describe('AppButton', () => {
  it('should render correctly with label', () => {
    const wrapper = mount(AppButton, {
      props: {
        label: 'Test Button',
      },
    })

    expect(wrapper.text()).toBe('Test Button')
    expect(wrapper.classes()).toContain('h-11')
  })

  it('should emit click event', async () => {
    const wrapper = mount(AppButton, {
      props: {
        label: 'Click Me',
      },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('should not emit click when disabled', async () => {
    const wrapper = mount(AppButton, {
      props: {
        label: 'Disabled',
        disabled: true,
      },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })
})
