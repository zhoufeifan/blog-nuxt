/**
 *
 * option
 */

// import service from '../api';
import articleList from '../data/article';
import { getTagList, getYearList } from '../utils/tools';
const service = {};


export const state = () => {
  return {
    tagList: getTagList(articleList),
    yearList: getYearList(articleList),
    articleList,
  };
};

export const mutations = {
  // 侧栏
  CHANGE_ASIDE_PAGE(state, data) {
    state.isAsidePage = data;
  },

  // 设置UA
  SET_USER_AGENT(state, action) {
    state.userAgent = action;
  },

  // 设置是否移动端状态
  SET_MOBILE_LAYOUT(state, action) {
    state.mobileLayout = action;
  },

  // 设置是否移动端状态
  SET_MOBILE_SIDEBAR(state, action) {
    state.mobileSidebar = action;
  },

  // 博主用户信息
  SET_ADMIN_INFO(state, data) {
    state.adminInfo = data;
  },

  // 网站信息
  SET_WEB_OPTION(state, data) {
    state.option = data;
  },

  // 错误页面
  SET_ERROR_PAGE(state, data) {
    state.isError = data;
  },

  // 欢迎页面
  CHANGE_WEL_PAGE(state, data) {
    state.isWelcome = data;
  },

  LOADING_CHANGE(state, status) {
    state.pageLoading = status;
    console.log(status);
  }
};

export const actions = {
  // 获取博主用户信息
  async getAdminInfo({ commit }) {
    const res = await service.getAuth();
    commit('SET_ADMIN_INFO', res.result || {});
  },

  // 获取网站信息
  async getOpt({ commit }) {
    const res = await service.getOpt();
    commit('SET_WEB_OPTION', res.result || {});
  }
};
