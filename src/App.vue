<script setup lang="ts">
import { ref } from "vue";

const categories = [["🍜", "美食"], ["☕", "咖啡"], ["🎤", "休闲娱乐"], ["🛍️", "逛街"], ["🏨", "酒店"], ["💆", "丽人"], ["🏃", "运动健身"], ["🎓", "亲子教育"]] as const;
const shops = [
  { image: "🥘", tone: "#f5a14a", name: "山野火锅·重庆老味道", tag: "火锅 · 静安寺", score: "4.8", reviews: "2.6万", price: "¥128", badge: "必吃榜", desc: "牛油锅底香醇，鲜毛肚脆爽，排队也值得。" },
  { image: "🍣", tone: "#8fa8bc", name: "和旬·日式料理", tag: "日本料理 · 淮海路", score: "4.7", reviews: "8562", price: "¥296", badge: "口碑榜", desc: "当季食材与细腻板前体验，适合重要的晚餐。" },
  { image: "☕", tone: "#a8755e", name: "Morrow 咖啡实验室", tag: "咖啡厅 · 武康路", score: "4.6", reviews: "1.2万", price: "¥42", badge: "人气店", desc: "一杯手冲，享受梧桐树下的慢节奏午后。" },
];
const cityGroups = [
  { letter: "A", cities: ["安庆", "鞍山"] }, { letter: "B", cities: ["北京", "保定", "包头"] },
  { letter: "C", cities: ["长春", "长沙", "成都", "重庆"] }, { letter: "D", cities: ["大连", "东莞"] },
  { letter: "F", cities: ["福州", "佛山"] }, { letter: "G", cities: ["广州", "贵阳"] },
  { letter: "H", cities: ["哈尔滨", "杭州", "合肥", "呼和浩特", "武汉"] }, { letter: "J", cities: ["济南", "嘉兴", "金华"] },
  { letter: "K", cities: ["昆明"] }, { letter: "L", cities: ["兰州", "洛阳"] },
  { letter: "N", cities: ["南昌", "南京", "南宁", "宁波"] }, { letter: "Q", cities: ["青岛", "泉州"] },
  { letter: "S", cities: ["上海", "沈阳", "石家庄", "苏州"] }, { letter: "T", cities: ["太原", "天津"] },
  { letter: "W", cities: ["无锡", "温州", "乌鲁木齐"] }, { letter: "X", cities: ["西安", "厦门", "徐州"] },
  { letter: "Y", cities: ["扬州", "烟台", "银川"] }, { letter: "Z", cities: ["郑州", "中山", "珠海"] },
] as const;
const query = ref("");
const liked = ref<number[]>([]);
const notice = ref("");
const selectedCity = ref("上海");
const isCityPickerOpen = ref(false);
function search() { notice.value = query.value ? `正在为你寻找「${query.value}」` : "试试搜索附近好店、菜品或商圈"; }
function toggleLike(index: number) { liked.value = liked.value.includes(index) ? liked.value.filter((item) => item !== index) : [...liked.value, index]; }
function selectCity(city: string) { selectedCity.value = city; isCityPickerOpen.value = false; notice.value = `已切换至${city}`; }
</script>

<template>
  <main>
    <header class="topbar"><div class="shell nav"><a class="brand" href="#top"><i>◉</i>大众点评</a><div class="city-picker"><button class="city" :aria-expanded="isCityPickerOpen" aria-controls="city-list" @click="isCityPickerOpen = !isCityPickerOpen">{{ selectedCity }}⌄</button><div v-if="isCityPickerOpen" id="city-list" class="city-menu"><div class="city-menu-title">选择城市</div><div v-for="group in cityGroups" :key="group.letter" class="city-group"><b>{{ group.letter }}</b><div><button v-for="city in group.cities" :key="city" :class="{ active: city === selectedCity }" @click="selectCity(city)">{{ city }}</button></div></div></div></div><div class="nav-search"><input v-model="query" placeholder="搜索商户、品类、商圈" @keyup.enter="search" /><button aria-label="搜索" @click="search">⌕</button></div><nav><a href="#discover">发现</a><a href="#ranking">榜单</a><a href="#community">社区</a></nav><button class="write" @click="notice = '登录后即可发布你的真实点评'">✎ 写点评</button></div></header>
    <section id="top" class="hero"><div class="shell hero-inner"><div class="hero-copy"><span class="eyebrow">LOCAL TASTE GUIDE</span><h1>城市很大，<br /><em>好店</em>在身边。</h1><p>发现值得专程前往的店，也记录每一个好吃、好玩、好看的日常。</p><div class="hero-search"><input v-model="query" placeholder="今天想吃什么？" @keyup.enter="search" /><button @click="search">搜索</button></div><div class="hot"><b>大家都在搜：</b><span>火锅</span><span>下午茶</span><span>约会餐厅</span></div><p v-if="notice" class="notice">{{ notice }}</p></div><div class="hero-art" aria-label="城市美食插画"><div class="sun" /><div class="cloud c1">☁</div><div class="cloud c2">☁</div><div class="plate">🥢<strong>上海美味<br />正在发生</strong></div><div class="building b1" /><div class="building b2" /><div class="building b3" /></div></div></section>
    <section id="discover" class="shell categories"><button v-for="([icon, text]) in categories" :key="text" @click="notice = `已为你打开${text}频道`"><span>{{ icon }}</span>{{ text }}</button></section>
    <section class="shell content"><div class="section-heading"><div><span class="eyebrow orange">CURATED FOR YOU</span><h2>附近值得一去的店</h2><p>基于热度、口碑和真实评价为你推荐</p></div><a href="#ranking">查看全部 →</a></div><div class="shop-grid"><article v-for="(shop, index) in shops" :key="shop.name" class="shop-card"><div class="shop-photo" :style="{ background: shop.tone }"><span>{{ shop.image }}</span><label>{{ shop.badge }}</label><button class="heart" aria-label="收藏" @click="toggleLike(index)">{{ liked.includes(index) ? '♥' : '♡' }}</button></div><div class="shop-info"><h3>{{ shop.name }}</h3><p>{{ shop.tag }}</p><div class="rating"><b>{{ shop.score }}</b><span>★★★★★</span><small>{{ shop.reviews }}条评价</small></div><div class="shop-bottom"><strong>{{ shop.price }}<small>/人</small></strong><button @click="notice = `已收藏「${shop.name}」，周末去打卡吧！`">想去</button></div><blockquote>“{{ shop.desc }}”</blockquote></div></article></div></section>
    <section id="ranking" class="rank-band"><div class="shell rank-inner"><div class="rank-lead"><span class="eyebrow">DIANPING LIST</span><h2>2026 必吃榜</h2><p>以食客真实体验，发掘城市里的好味道。</p><button @click="notice = '必吃榜单正在为你展开'">查看榜单 →</button></div><div class="rank-list"><div v-for="(item, index) in [['本帮菜 · 兰心餐厅', '9.2万'], ['西餐 · The Pine', '3.5万'], ['小吃 · 阿大葱油饼', '18.6万']]" :key="item[0]"><b>0{{ index + 1 }}</b><span>{{ item[0] }}<small>{{ item[1] }}人种草</small></span><em>→</em></div></div></div></section>
    <section id="community" class="shell community"><div class="section-heading"><div><span class="eyebrow orange">REAL MOMENTS</span><h2>大家正在分享</h2></div><a href="#top">去社区看看 →</a></div><div class="moments"><div class="moment yellow"><span>🍰</span><p>周末的仪式感，是一块刚出炉的巴斯克。</p><b>@奶油小狗</b></div><div class="moment blue"><span>🧋</span><p>在上海喝到的第 100 杯咖啡，今天也很满足。</p><b>@阿北吃不停</b></div><div class="moment pink"><span>🍝</span><p>藏在弄堂里的意面小馆，氛围感拉满。</p><b>@散步探店员</b></div></div></section>
    <footer><div class="shell"><a class="brand" href="#top"><i>◉</i>大众点评</a><span>让每一次消费，都更值得。</span><small>© 2026 Dianping · 发现品质生活</small></div></footer>
  </main>
</template>

<style>
.city-picker{position:relative}.city-picker .city{cursor:pointer;padding:8px 4px}.city-menu{position:absolute;top:42px;left:-14px;width:420px;max-height:420px;overflow-y:auto;padding:16px;background:#fffdf8;border:1px solid #f0e2d7;border-radius:10px;box-shadow:0 14px 34px #5b3b2026;z-index:20}.city-menu-title{font-size:14px;font-weight:700;color:#3d3530;margin-bottom:10px}.city-group{display:grid;grid-template-columns:20px 1fr;gap:8px;padding:7px 0;border-top:1px solid #f5ede7}.city-group b{font-size:12px;color:#e44e35;line-height:29px}.city-group div{display:flex;flex-wrap:wrap;gap:5px}.city-group button{border:0;background:transparent;border-radius:4px;padding:6px 8px;color:#5e534c;font-size:13px;cursor:pointer}.city-group button:hover,.city-group button.active{background:#fff0e7;color:#e84a30;font-weight:700}@media(max-width:760px){.city-menu{left:-78px;width:min(390px,calc(100vw - 24px));max-height:360px}}
</style>
