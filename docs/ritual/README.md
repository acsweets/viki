# 🌱 成长仪式

> 用仪式感驱动成长，记录每一个进步的瞬间

<div class="ritual-dashboard">

## 📅 今日打卡

<div class="today-checkin">
  <div class="checkin-card">
    <h3>✨ 今日哇因子</h3>
    <div class="wow-content">
      <p>"发现了Flutter中Widget树的优雅之处，就像俄罗斯套娃一样，每一层都有自己的职责，组合起来却能创造无限可能。"</p>
      <div class="wow-tags">
        <span class="tag tech">技术感悟</span>
        <span class="tag creative">创意</span>
      </div>
    </div>
  </div>

  <div class="checkin-card">
    <h3>🌍 Daily English</h3>
    <div class="english-content">
      <blockquote>"Code is like humor. When you have to explain it, it's bad."</blockquote>
      <p class="translation">代码就像幽默，当你需要解释它时，说明它很糟糕。</p>
      <div class="reflection">
        <strong>今日反思：</strong>写代码时要追求自解释性，让代码本身就能说明意图。
      </div>
    </div>
  </div>

  <div class="checkin-card">
    <h3>🎯 进度 & 自省</h3>
    <div class="progress-content">
      <div class="progress-item">
        <span class="label">学习进度</span>
        <div class="progress-bar">
          <div class="progress-fill" style="width: 75%"></div>
        </div>
        <span class="percentage">75%</span>
      </div>
      
      <div class="self-reflection">
        <h4>今日自省</h4>
        <ul>
          <li>✅ 完成了Flutter状态管理的深度学习</li>
          <li>✅ 解决了一个困扰已久的布局问题</li>
          <li>⚠️ 在代码重构上有些拖延，明天需要专注处理</li>
          <li>🎯 对Riverpod的理解更深入了，可以开始实际项目应用</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="checkin-card">
    <h3>🔗 关联技术卡片</h3>
    <div class="linked-cards">
      <a href="/tech-cards/flutter-state-management" class="card-link">
        <span class="card-title">Flutter状态管理对比</span>
        <span class="card-tag">今日学习</span>
      </a>
      <a href="/tech-cards/widget-composition" class="card-link">
        <span class="card-title">Widget组合模式</span>
        <span class="card-tag">深度理解</span>
      </a>
    </div>
  </div>
</div>

## 📊 成长历程

<div class="growth-timeline">
  <div class="timeline-stats">
    <div class="stat-item">
      <div class="stat-number">7</div>
      <div class="stat-label">连续打卡天数</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">23</div>
      <div class="stat-label">本月哇因子</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">15</div>
      <div class="stat-label">技术卡片</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">85%</div>
      <div class="stat-label">目标完成度</div>
    </div>
  </div>
</div>

## 📈 打卡日历

<div class="calendar-view">
  <div class="calendar-header">
    <h3>2024年1月</h3>
    <div class="legend">
      <span class="legend-item"><span class="dot active"></span>活跃</span>
      <span class="legend-item"><span class="dot moderate"></span>一般</span>
      <span class="legend-item"><span class="dot low"></span>低迷</span>
      <span class="legend-item"><span class="dot rest"></span>休息</span>
    </div>
  </div>
  
  <div class="calendar-grid">
    <div class="calendar-day">
      <span class="day-number">1</span>
      <div class="day-status active"></div>
    </div>
    <div class="calendar-day">
      <span class="day-number">2</span>
      <div class="day-status active"></div>
    </div>
    <div class="calendar-day">
      <span class="day-number">3</span>
      <div class="day-status moderate"></div>
    </div>
    <div class="calendar-day">
      <span class="day-number">4</span>
      <div class="day-status rest"></div>
    </div>
    <div class="calendar-day">
      <span class="day-number">5</span>
      <div class="day-status active"></div>
    </div>
    <div class="calendar-day">
      <span class="day-number">6</span>
      <div class="day-status active"></div>
    </div>
    <div class="calendar-day current">
      <span class="day-number">7</span>
      <div class="day-status active"></div>
    </div>
  </div>
</div>

## 📤 数据导出

<div class="export-section">
  <p>将你的成长记录导出为个人档案</p>
  <div class="export-buttons">
    <button class="btn-export pdf">📄 导出PDF</button>
    <button class="btn-export markdown">📝 导出Markdown</button>
    <button class="btn-export json">📊 导出数据</button>
  </div>
</div>

</div>

<style>
.ritual-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.today-checkin {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.checkin-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
}

.checkin-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
}

.checkin-card h3 {
  margin: 0 0 1rem 0;
  color: #1E2A38;
  font-size: 1.1rem;
}

.wow-content p {
  font-style: italic;
  color: #555;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.wow-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.tag.tech {
  background: rgba(108, 92, 231, 0.1);
  color: #6C5CE7;
}

.tag.creative {
  background: rgba(255, 107, 107, 0.1);
  color: #FF6B6B;
}

.english-content blockquote {
  font-size: 1.1rem;
  font-style: italic;
  color: #6C5CE7;
  margin: 0 0 0.5rem 0;
  font-family: 'Quicksand', sans-serif;
}

.translation {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.reflection {
  background: #F8F9FA;
  padding: 1rem;
  border-radius: 8px;
  border-left: 3px solid #00B894;
}

.progress-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.label {
  font-weight: 500;
  color: #333;
  min-width: 80px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #E9ECEF;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00B894, #00A085);
  transition: width 0.3s ease;
}

.percentage {
  font-weight: 600;
  color: #00B894;
  min-width: 40px;
}

.self-reflection ul {
  margin: 0;
  padding-left: 0;
  list-style: none;
}

.self-reflection li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #F0F0F0;
}

.self-reflection li:last-child {
  border-bottom: none;
}

.linked-cards {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #F8F9FA;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

.card-link:hover {
  background: #E9ECEF;
  transform: translateX(4px);
}

.card-title {
  font-weight: 500;
  color: #333;
}

.card-tag {
  font-size: 0.8rem;
  color: #6C5CE7;
  background: rgba(108, 92, 231, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
}

.timeline-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.stat-item {
  text-align: center;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #6C5CE7;
  font-family: 'Quicksand', sans-serif;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.calendar-view {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  margin: 2rem 0;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.legend {
  display: flex;
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #666;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dot.active { background: #00B894; }
.dot.moderate { background: #FAB1A0; }
.dot.low { background: #FD79A8; }
.dot.rest { background: #DDD; }

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  position: relative;
  transition: all 0.3s ease;
}

.calendar-day:hover {
  background: #F8F9FA;
}

.calendar-day.current {
  background: rgba(108, 92, 231, 0.1);
  border: 2px solid #6C5CE7;
}

.day-number {
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
}

.day-status {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-top: 4px;
}

.day-status.active { background: #00B894; }
.day-status.moderate { background: #FAB1A0; }
.day-status.low { background: #FD79A8; }
.day-status.rest { background: #DDD; }

.export-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  text-align: center;
  margin: 2rem 0;
}

.export-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.btn-export {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-export.pdf {
  background: #FF6B6B;
  color: white;
}

.btn-export.markdown {
  background: #4ECDC4;
  color: white;
}

.btn-export.json {
  background: #45B7D1;
  color: white;
}

.btn-export:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

@media (max-width: 768px) {
  .today-checkin {
    grid-template-columns: 1fr;
  }
  
  .timeline-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .calendar-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .legend {
    flex-wrap: wrap;
  }
  
  .export-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>