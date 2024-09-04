import { shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia, setActivePinia } from 'pinia';
import SignInView from '../../src/views/SignIn.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: SignInView },
  ],
});

describe('SignIn Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should render correctly', async () => {
    const wrapper = shallowMount(SignInView, {
      global: {
        plugins: [router, createPinia()],
      },
    });

    await router.isReady();

    expect(wrapper.exists()).toBe(true);
  });
});