"use client";

import { useState } from "react";

const categories = [
  ["🍜", "美食"], ["☕", "咖啡"], ["🎤", "休闲娱乐"], ["🛍️", "逛街"],
  ["🏨", "酒店"], ["💆", "丽人"], ["🏃", "运动健身"], ["🎓", "亲子教育"],
];

const shops = [
  { image: "🥘", tone: "#f5a14a", name: "山野火锅·重庆老味道", tag: "火锅 · 静安寺", score: "4.8", reviews: "2.6万", price: "¥128", badge: "必吃榜", desc: "牛油锅底香醇，鲜毛肚脆爽，排队也值得。" },
  { image: "🍣", tone: "#8fa8bc", name: "和旬·日式料理", tag: "日本料理 · 淮海路", score: "4.7", reviews: "8562", price: "¥296", badge: "口碑榜", desc: "当季食材与细腻板前体验，适合重要的晚餐。" },
  { image: "☕", tone: "#a8755e", name: "Morrow 咖啡实验室", tag: "咖啡厅 · 武康路", score: "4.6", reviews: "1.2万", price: "¥42", badge: "人气店", desc: "一杯手冲，享受梧桐树下的慢节奏午后。" },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [liked, setLiked] = useState<number[]>([]);
  const [notice, setNotice] = useState("");
  const toggleLike = (i: number) => setLiked((items) => items.includes(i) ? items.filter((x) => x !== i) : [...items, i]);
  const search = () => setNotice(query ? `正在为你寻找「${query}」` : "试试搜索附近好店、菜品或商圈");

  return <main>
    <header className="topbar">
      <div className="shell nav"><a className="brand" href="#top"><i>◉</i>大众点评</a><button className="city">上海⌄</button><div className="nav-search"><input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && search()} placeholder="搜索商户、品类、商圈"/><button aria-label="搜索" onClick={search}>⌕</button></div><nav><a href="#discover">发现</a><a href="#ranking">榜单</a><a href="#community">社区</a></nav><button className="write" onClick={() => setNotice("登录后即可发布你的真实点评")}>✎ 写点评</button></div>
    </header>

    <section className="hero" id="top"><div className="shell hero-inner"><div className="hero-copy"><span className="eyebrow">LOCAL TASTE GUIDE</span><h1>城市很大，<br/><em>好店</em>在身边。</h1><p>发现值得专程前往的店，也记录每一个好吃、好玩、好看的日常。</p><div className="hero-search"><input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && search()} placeholder="今天想吃什么？"/><button onClick={search}>搜索</button></div><div className="hot"><b>大家都在搜：</b><span>火锅</span><span>下午茶</span><span>约会餐厅</span></div>{notice && <p className="notice">{notice}</p>}</div><div className="hero-art" aria-label="城市美食插画"><div className="sun"/><div className="cloud c1">☁</div><div className="cloud c2">☁</div><div className="plate">🥢<strong>上海美味<br/>正在发生</strong></div><div className="building b1"/><div className="building b2"/><div className="building b3"/></div></div></section>

    <section className="shell categories" id="discover">{categories.map(([icon, text]) => <button key={text} onClick={() => setNotice(`已为你打开${text}频道`)}><span>{icon}</span>{text}</button>)}</section>

    <section className="shell content"><div className="section-heading"><div><span className="eyebrow orange">CURATED FOR YOU</span><h2>附近值得一去的店</h2><p>基于热度、口碑和真实评价为你推荐</p></div><a href="#ranking">查看全部 →</a></div><div className="shop-grid">{shops.map((shop, i) => <article className="shop-card" key={shop.name}><div className="shop-photo" style={{background: shop.tone}}><span>{shop.image}</span><label>{shop.badge}</label><button className="heart" aria-label="收藏" onClick={() => toggleLike(i)}>{liked.includes(i) ? "♥" : "♡"}</button></div><div className="shop-info"><h3>{shop.name}</h3><p>{shop.tag}</p><div className="rating"><b>{shop.score}</b><span>★★★★★</span><small>{shop.reviews}条评价</small></div><div className="shop-bottom"><strong>{shop.price}<small>/人</small></strong><button onClick={() => setNotice(`已收藏「${shop.name}」，周末去打卡吧！`)}>想去</button></div><blockquote>“{shop.desc}”</blockquote></div></article>)}</div></section>

    <section className="rank-band" id="ranking"><div className="shell rank-inner"><div className="rank-lead"><span className="eyebrow">DIANPING LIST</span><h2>2026 必吃榜</h2><p>以食客真实体验，发掘城市里的好味道。</p><button onClick={() => setNotice("必吃榜单正在为你展开")}>查看榜单 →</button></div><div className="rank-list">{["本帮菜 · 兰心餐厅", "西餐 · The Pine", "小吃 · 阿大葱油饼"].map((x, i) => <div key={x}><b>0{i + 1}</b><span>{x}<small>{["9.2万", "3.5万", "18.6万"][i]}人种草</small></span><em>→</em></div>)}</div></div></section>

    <section className="shell community" id="community"><div className="section-heading"><div><span className="eyebrow orange">REAL MOMENTS</span><h2>大家正在分享</h2></div><a href="#top">去社区看看 →</a></div><div className="moments"><div className="moment yellow"><span>🍰</span><p>周末的仪式感，是一块刚出炉的巴斯克。</p><b>@奶油小狗</b></div><div className="moment blue"><span>🧋</span><p>在上海喝到的第 100 杯咖啡，今天也很满足。</p><b>@阿北吃不停</b></div><div className="moment pink"><span>🍝</span><p>藏在弄堂里的意面小馆，氛围感拉满。</p><b>@散步探店员</b></div></div></section>
    <footer><div className="shell"><a className="brand" href="#top"><i>◉</i>大众点评</a><span>让每一次消费，都更值得。</span><small>© 2026 Dianping · 发现品质生活</small></div></footer>
  </main>;
}
