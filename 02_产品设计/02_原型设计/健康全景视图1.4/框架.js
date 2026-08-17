/* ==========================================================================
 * 统一框架：顶部导航栏 + 左侧菜单栏（与 框架.css 配套使用）
 * --------------------------------------------------------------------------
 * 用法：页面 <body> 末尾、页面业务脚本之前引入（页面主体须为
 *       <div class="main-area">…</div>，框架会自动将其放入布局中）：
 *
 *   <script src="框架.js" data-page="tuomin"></script>
 *
 *   data-page     = 左侧菜单项的 key（用于当前页高亮），必填
 *   data-sysname  = 顶部系统名称（可选，默认「健康医疗应用中心」）
 *   data-org      = 顶部机构名称（可选，默认「温江区第一人民医院」）
 *
 * 新增业务页面步骤：
 *   1. 在下方 MENU 中增加菜单项（key、label、url）
 *   2. 新页面引入 框架.css / 框架.js，传入对应 data-page
 * ========================================================================== */
(function () {
  'use strict';

  /* ================= 菜单配置（改菜单只需改这里） ================= */
  var MENU = [
    { type: 'item', key: 'home', label: '首页',
      icon: '<path d="M3 12L12 3l9 9M5 10v10h14V10"/>' },
    { type: 'divider' },
    { type: 'group', key: 'template', label: '模板管理',
      icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
      children: [] },
    { type: 'divider' },
    { type: 'item', key: 'page', label: '页面管理',
      icon: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>' },
    { type: 'divider' },
    { type: 'group', key: 'log', label: '日志管理',
      icon: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/>',
      children: [] },
    { type: 'divider' },
    { type: 'group', key: 'system', label: '系统设置',
      icon: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33h0a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51h0a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v0a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>',
      children: [
        { key: 'tuomin',    label: '脱敏配置',     url: '脱敏规则.html' },
        { key: 'scene',     label: '场景配置',     url: '场景配置.html' },
        { key: 'module',    label: '模块设置' },
        { key: 'common',    label: '通用设置' },
        { key: 'msgpush',   label: '消息推送配置' },
        { key: 'view-list', label: '视图配置',     url: 'resident-view-list.html' }
      ] }
  ];

  /* ================= 页面参数 ================= */
  var scriptTag = document.currentScript || document.querySelector('script[src$="框架.js"]') || {};
  var pageKey = scriptTag.getAttribute('data-page') || '';
  var sysName = scriptTag.getAttribute('data-sysname') || '健康医疗应用中心';
  var orgName = scriptTag.getAttribute('data-org') || '温江区第一人民医院';

  /* ================= 顶部导航栏 ================= */
  var TOPBAR_HTML = `
<div class="topbar">
  <img class="tb-logo" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect x='3' y='3' width='7' height='7' rx='1.5' fill='white'/%3E%3Crect x='14' y='3' width='7' height='7' rx='1.5' fill='white'/%3E%3Crect x='3' y='14' width='7' height='7' rx='1.5' fill='white'/%3E%3Crect x='14' y='14' width='7' height='7' rx='1.5' fill='white'/%3E%3C/svg%3E" alt="">
  <span class="tb-sysname">${sysName}</span>
  <span class="tb-org">${orgName}</span>
  <div class="spacer"></div>
  <div class="tb-badge">
    <svg viewBox="0 0 19 18" width="19" height="18" fill="none"><rect x="0.5" y="0.5" width="18" height="17" rx="3" stroke="rgba(255,255,255,0.6)" stroke-width="1"/></svg>
    <div class="badge-dot"><svg viewBox="0 0 6 9" width="6" height="9"><text x="0" y="8" font-size="9" fill="white" font-weight="700">2</text></svg></div>
  </div>
  <img class="tb-icon" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9' stroke='white' stroke-width='1.5' fill='none'/%3E%3Cpath d='M13.73 21a2 2 0 01-3.46 0' stroke='white' stroke-width='1.5' fill='none'/%3E%3C/svg%3E" alt="">
  <img class="tb-icon2" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='8' r='4' stroke='white' stroke-width='1.5' fill='none'/%3E%3Cpath d='M5.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5' stroke='white' stroke-width='1.5' fill='none'/%3E%3C/svg%3E" alt="">
  <img class="tb-avatar" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25 25'%3E%3Ccircle cx='12.5' cy='12.5' r='12.5' fill='rgba(255,255,255,0.25)'/%3E%3Ccircle cx='12.5' cy='10' r='4' fill='white'/%3E%3Cellipse cx='12.5' cy='21' rx='7' ry='4' fill='white'/%3E%3C/svg%3E" alt="">
  <span class="tb-user">admin</span>
  <svg class="tb-arrow" viewBox="0 0 10 5"><polygon points="0,0 5,5 10,0" fill="rgba(255,255,255,0.6)"/></svg>
</div>`;

  /* ================= 左侧菜单栏 ================= */
  function buildSidebar() {
    var html = '<aside class="sidebar"><div class="sidebar-menu">';
    MENU.forEach(function (it) {
      if (it.type === 'divider') { html += '<div class="menu-divider"></div>'; return; }
      var children = it.children || [];
      var isGroup = it.type === 'group';
      var expanded = isGroup && children.some(function (c) { return c.key === pageKey; });
      html += '<div class="menu-item' + (expanded ? ' expanded' : '') + '" onclick="' +
        (isGroup ? 'toggleMenu(this)' : "navigate('" + it.key + "')") + '">' +
        '<span class="menu-icon"><svg viewBox="0 0 24 24">' + it.icon + '</svg></span>' +
        '<span class="menu-label">' + it.label + '</span>' +
        (isGroup ? '<svg class="arrow" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>' : '') +
        '</div>';
      if (isGroup) {
        html += '<div class="menu-sub' + (expanded ? ' open' : '') + '">' + children.map(function (c) {
          var active = c.key === pageKey ? ' active' : '';
          return '<div class="sub-item' + active + '" onclick="event.stopPropagation();navigate(\'' + c.key + '\')">' + c.label + '</div>';
        }).join('') + '</div>';
      }
    });
    return html + '</div></aside>';
  }

  /* ================= 框架注入 ================= */
  function inject() {
    var main = document.querySelector('.main-area');
    if (!main) return;
    // 创建布局并注入左侧菜单栏，把页面主内容区移入布局
    var layout = document.createElement('div');
    layout.className = 'layout';
    layout.innerHTML = buildSidebar();
    main.parentNode.insertBefore(layout, main);
    layout.appendChild(main);
    // 顶部导航栏插入 body 最前
    var topbar = document.createElement('div');
    topbar.className = 'topbar';
    topbar.innerHTML = TOPBAR_HTML;
    document.body.insertBefore(topbar, document.body.firstChild);
    // Toast 容器
    var toastDiv = document.createElement('div');
    toastDiv.className = 'toast';
    toastDiv.id = 'toast';
    document.body.appendChild(toastDiv);
  }

  /* ================= 公共函数（页面可直接调用） ================= */
  function findMenuItem(key) {
    for (var i = 0; i < MENU.length; i++) {
      var it = MENU[i];
      if (it.key === key) return it;
      var children = it.children || [];
      for (var j = 0; j < children.length; j++) {
        if (children[j].key === key) return children[j];
      }
    }
    return null;
  }

  window.toggleMenu = function (el) {
    el.classList.toggle('expanded');
    var sub = el.nextElementSibling;
    if (sub) sub.classList.toggle('open');
  };

  window.navigate = function (key) {
    var item = findMenuItem(key);
    if (!item) return;
    if (item.url) {
      if (item.key === pageKey) return; // 当前页
      window.location.href = item.url;
    } else {
      toast('已切换到：' + item.label, 'info');
    }
  };

  var _toastTimer;
  window.toast = function (msg, type) {
    var el = document.getElementById('toast');
    if (!el) return;
    el.className = 'toast' + (type ? ' ' + type : '');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2000);
  };

  window.escapeHtml = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  inject();
})();
