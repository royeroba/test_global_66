import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FavoriteButton from '../FavoriteButton.vue'

describe('FavoriteButton', () => {
  it('should render correctly when inactive', () => {
    const wrapper = mount(FavoriteButton, {
      props: { active: false },
    })

    expect(wrapper.attributes('aria-pressed')).toBe('false')
    expect(wrapper.find('img').exists()).toBe(true)
  })

  it('should render correctly when active', () => {
    const wrapper = mount(FavoriteButton, {
      props: { active: true },
    })

    expect(wrapper.attributes('aria-pressed')).toBe('true')
  })

  it('should emit toggle event on click', async () => {
    const wrapper = mount(FavoriteButton, {
      props: { active: false },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('toggle')).toBeTruthy()
  })

  it('should be disabled when disabled prop is true', () => {
    const wrapper = mount(FavoriteButton, {
      props: { active: false, disabled: true },
    })

    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('should not emit toggle when disabled', async () => {
    const wrapper = mount(FavoriteButton, {
      props: { active: false, disabled: true },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('toggle')).toBeFalsy()
  })
})
