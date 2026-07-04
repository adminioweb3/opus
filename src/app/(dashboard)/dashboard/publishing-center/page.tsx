"use client";

export default function PublishingCenterPage() {
      return <div dangerouslySetInnerHTML={{ __html: `<div class="view cs-scope cs-pub-scope"><div class="cs-page">
      <div class="cs-head">
        <div>
          <div class="cs-brand"><span class="cs-brand-dot"></span>Content studio</div>
          <h1 class="cs-title">Publishing Center</h1>
          <p class="cs-subtitle">Purpose: Publish and distribute optimized content across websites, CMS platforms, and social media from one centralized dashboard.</p>
        </div>
        <div class="cs-head-tools">
          <div class="cs-pill"><strong>Distribution Hub</strong> Websites, CMS, social, and approvals</div>
          <div class="cs-pill"><strong>Connected</strong> 2 CMS / storefronts and 4 socials</div>
        </div>
      </div>

      <section class="cs-card">
        <div class="cs-card-body cs-pub-toolbar">
          <div class="cs-pub-toolbar-top">
            <label class="cs-pub-search">
              <i class="ti ti-search"></i>
              <input type="search" placeholder="Search content, platforms, schedules..." oninput="toast('Searching schedules...','info')">
            </label>
            <div class="cs-pub-actionbar">
              <button class="cs-btn primary" type="button" onclick="toast('Publishing current active campaign bundle...','info')"><i class="ti ti-send"></i> Publish Now</button>
              <button class="cs-btn primary" type="button" onclick="toast('Please select a draft or social card to schedule','warn')"><i class="ti ti-calendar-plus"></i> Schedule Content</button>
              <button class="cs-btn secondary" type="button" id="csConnectPlatformBtn"><i class="ti ti-plug-connected"></i> Connect Platform</button>
              <button class="cs-btn soft" type="button" onclick="toast('Publishing report exported successfully','ok')"><i class="ti ti-file-export"></i> Export Publishing Report</button>
            </div>
          </div>
          <div class="cs-pub-filter-row">
            <button class="cs-pub-filter is-active" type="button" data-pub-filter>All</button>
            <button class="cs-pub-filter" type="button" data-pub-filter>Draft</button>
            <button class="cs-pub-filter" type="button" data-pub-filter>Ready</button>
            <button class="cs-pub-filter" type="button" data-pub-filter>Scheduled</button>
            <button class="cs-pub-filter" type="button" data-pub-filter>Published</button>
            <button class="cs-pub-filter" type="button" data-pub-filter>Failed</button>
            <button class="cs-pub-filter" type="button" data-pub-filter>Pending Approval</button>
          </div>
        </div>
      </section>

      <section class="cs-card">
        <div class="cs-card-head">
          <div>
            <h2>Publishing Analytics Summary</h2>
            <p class="cs-card-sub">A compact dashboard for what has shipped, what is scheduled, and what needs attention.</p>
          </div>
        </div>
        <div class="cs-card-body">
          <div class="cs-pub-analytics"><article class="cs-pub-kpi">
        <div class="cs-pub-kpi-top">
          <div class="cs-pub-kpi-label">Published Today</div>
          <span class="cs-pub-kpi-icon"><i class="ti ti-send"></i></span>
        </div>
        <div class="cs-pub-kpi-value">7</div>
        <div class="cs-pub-kpi-trend">+3 vs yesterday</div>
      </article><article class="cs-pub-kpi">
        <div class="cs-pub-kpi-top">
          <div class="cs-pub-kpi-label">Scheduled</div>
          <span class="cs-pub-kpi-icon"><i class="ti ti-calendar-event"></i></span>
        </div>
        <div class="cs-pub-kpi-value">7</div>
        <div class="cs-pub-kpi-trend">+5 upcoming this week</div>
      </article><article class="cs-pub-kpi">
        <div class="cs-pub-kpi-top">
          <div class="cs-pub-kpi-label">Pending Approval</div>
          <span class="cs-pub-kpi-icon"><i class="ti ti-checklist"></i></span>
        </div>
        <div class="cs-pub-kpi-value">2</div>
        <div class="cs-pub-kpi-trend">Waiting on reviews</div>
      </article><article class="cs-pub-kpi">
        <div class="cs-pub-kpi-top">
          <div class="cs-pub-kpi-label">Failed Publications</div>
          <span class="cs-pub-kpi-icon"><i class="ti ti-alert-triangle"></i></span>
        </div>
        <div class="cs-pub-kpi-value">01</div>
        <div class="cs-pub-kpi-trend">1 Shopify retry needed</div>
      </article></div>
        </div>
      </section>

      <section class="cs-card">
        <div class="cs-card-head">
          <div>
            <h2>Publishing Platforms</h2>
            <p class="cs-card-sub">Manage connected CMS and storefront endpoints for live content distribution.</p>
          </div>
        </div>
        <div class="cs-card-body">
          <div class="cs-pub-grid-3" id="csPlatformContainer"><article class="cs-pub-platform-card">
        <div class="cs-pub-platform-head">
          <div class="cs-pub-brand">
            <span class="cs-pub-icon"><i class="ti ti-brand-wordpress"></i></span>
            <div>
              <div class="cs-pub-name">WordPress</div>
              <div class="cs-pub-sub">Content distribution endpoint</div>
            </div>
          </div>
          <span class="cs-pub-status connected">Connected</span>
        </div>
        <div class="cs-pub-platform-meta">
          <div class="cs-pub-meta-row"><span>Last published</span><strong>Today, 10:24 AM</strong></div>
          <div class="cs-pub-meta-row"><span>Connection</span><strong>Connected</strong></div>
        </div>
        <div class="cs-pub-card-actions">
          <button class="cs-btn soft" type="button" data-pub-action-idx="0">Connected</button>
          <button class="cs-btn primary" type="button" data-pub-now-idx="0" >Publish Now</button>
        </div>
      </article><article class="cs-pub-platform-card">
        <div class="cs-pub-platform-head">
          <div class="cs-pub-brand">
            <span class="cs-pub-icon"><i class="ti ti-shopping-bag"></i></span>
            <div>
              <div class="cs-pub-name">Shopify</div>
              <div class="cs-pub-sub">Content distribution endpoint</div>
            </div>
          </div>
          <span class="cs-pub-status connected">Connected</span>
        </div>
        <div class="cs-pub-platform-meta">
          <div class="cs-pub-meta-row"><span>Last published</span><strong>Yesterday, 04:12 PM</strong></div>
          <div class="cs-pub-meta-row"><span>Connection</span><strong>Connected</strong></div>
        </div>
        <div class="cs-pub-card-actions">
          <button class="cs-btn soft" type="button" data-pub-action-idx="1">Connected</button>
          <button class="cs-btn primary" type="button" data-pub-now-idx="1" >Publish Now</button>
        </div>
      </article><article class="cs-pub-platform-card">
        <div class="cs-pub-platform-head">
          <div class="cs-pub-brand">
            <span class="cs-pub-icon"><i class="ti ti-layout-dashboard"></i></span>
            <div>
              <div class="cs-pub-name">Webflow</div>
              <div class="cs-pub-sub">Content distribution endpoint</div>
            </div>
          </div>
          <span class="cs-pub-status pending">Not Connected</span>
        </div>
        <div class="cs-pub-platform-meta">
          <div class="cs-pub-meta-row"><span>Last published</span><strong>No publish yet</strong></div>
          <div class="cs-pub-meta-row"><span>Connection</span><strong>Not Connected</strong></div>
        </div>
        <div class="cs-pub-card-actions">
          <button class="cs-btn secondary" type="button" data-pub-action-idx="2">Connect</button>
          <button class="cs-btn primary" type="button" data-pub-now-idx="2" disabled>Publish Now</button>
        </div>
      </article></div>
        </div>
      </section>

      <section class="cs-card">
        <div class="cs-card-head">
          <div>
            <h2>Multi-Channel Distribution</h2>
            <p class="cs-card-sub">Choose the channels where this optimized content should be distributed next.</p>
          </div>
          <div class="cs-pill"><strong>Selectable</strong> Multiple destinations can be active at once</div>
        </div>
        <div class="cs-card-body">
          <div class="cs-pub-grid-3"><button class="cs-pub-channel is-selected" type="button" data-pub-channel-idx="0" aria-pressed="true">
        <div class="cs-pub-channel-top">
          <div class="cs-pub-channel-title">Website</div>
          <span class="cs-pub-check"><i class="ti ti-check"></i></span>
        </div>
        <div class="cs-pub-channel-copy">Primary landing and solution pages</div>
      </button><button class="cs-pub-channel is-selected" type="button" data-pub-channel-idx="1" aria-pressed="true">
        <div class="cs-pub-channel-top">
          <div class="cs-pub-channel-title">Blog</div>
          <span class="cs-pub-check"><i class="ti ti-check"></i></span>
        </div>
        <div class="cs-pub-channel-copy">Long-form SEO and thought leadership posts</div>
      </button><button class="cs-pub-channel" type="button" data-pub-channel-idx="2" aria-pressed="false">
        <div class="cs-pub-channel-top">
          <div class="cs-pub-channel-title">Knowledge Base</div>
          <span class="cs-pub-check"><i class="ti ti-check"></i></span>
        </div>
        <div class="cs-pub-channel-copy">Structured help and answer-ready content</div>
      </button><button class="cs-pub-channel" type="button" data-pub-channel-idx="3" aria-pressed="false">
        <div class="cs-pub-channel-top">
          <div class="cs-pub-channel-title">Newsletter</div>
          <span class="cs-pub-check"><i class="ti ti-check"></i></span>
        </div>
        <div class="cs-pub-channel-copy">Email distribution for owned audiences</div>
      </button><button class="cs-pub-channel is-selected" type="button" data-pub-channel-idx="4" aria-pressed="true">
        <div class="cs-pub-channel-top">
          <div class="cs-pub-channel-title">Social Media</div>
          <span class="cs-pub-check"><i class="ti ti-check"></i></span>
        </div>
        <div class="cs-pub-channel-copy">Cross-platform snippets and promotional content</div>
      </button><button class="cs-pub-channel" type="button" data-pub-channel-idx="5" aria-pressed="false">
        <div class="cs-pub-channel-top">
          <div class="cs-pub-channel-title">Documentation</div>
          <span class="cs-pub-check"><i class="ti ti-check"></i></span>
        </div>
        <div class="cs-pub-channel-copy">Product education and implementation guides</div>
      </button></div>
        </div>
      </section>

      <section class="cs-card">
        <div class="cs-card-head">
          <div>
            <h2>Social Media Scheduler</h2>
            <p class="cs-card-sub">Schedule placeholder distribution for LinkedIn, X, Facebook, and Instagram.</p>
          </div>
        </div>
        <div class="cs-card-body">
          <div class="cs-pub-grid-2"><article class="cs-pub-social-card">
        <div class="cs-pub-social-top">
          <div class="cs-pub-brand">
            <span class="cs-pub-icon"><i class="ti ti-brand-linkedin"></i></span>
            <div>
              <div class="cs-pub-name">LinkedIn</div>
              <div class="cs-pub-sub">Distribution channel ready</div>
            </div>
          </div>
          <span class="cs-pub-status connected">Connected</span>
        </div>
        <div class="cs-pub-social-status" id="csSocialStatusText-0"><i class="ti ti-circle-check"></i> Distribution schedule active</div>
        <label class="cs-pub-toggle"><input type="checkbox" checked data-social-check-idx="0"> Schedule toggle</label>
        <div class="cs-pub-input-grid">
          <input class="cs-pub-input" type="date" value="2026-07-03" id="csSocialDate-0">
          <input class="cs-pub-input" type="time" value="11:00" id="csSocialTime-0">
        </div>
        <div class="cs-pub-card-actions">
          <button class="cs-btn secondary" type="button" data-social-pub-now-idx="0">Publish Now</button>
          <button class="cs-btn primary" type="button" data-social-sched-idx="0">Schedule Post</button>
        </div>
      </article><article class="cs-pub-social-card">
        <div class="cs-pub-social-top">
          <div class="cs-pub-brand">
            <span class="cs-pub-icon"><i class="ti ti-brand-x"></i></span>
            <div>
              <div class="cs-pub-name">X (Twitter)</div>
              <div class="cs-pub-sub">Distribution channel ready</div>
            </div>
          </div>
          <span class="cs-pub-status connected">Connected</span>
        </div>
        <div class="cs-pub-social-status" id="csSocialStatusText-1"><i class="ti ti-circle-check"></i> Distribution schedule active</div>
        <label class="cs-pub-toggle"><input type="checkbox" checked data-social-check-idx="1"> Schedule toggle</label>
        <div class="cs-pub-input-grid">
          <input class="cs-pub-input" type="date" value="2026-07-04" id="csSocialDate-1">
          <input class="cs-pub-input" type="time" value="09:30" id="csSocialTime-1">
        </div>
        <div class="cs-pub-card-actions">
          <button class="cs-btn secondary" type="button" data-social-pub-now-idx="1">Publish Now</button>
          <button class="cs-btn primary" type="button" data-social-sched-idx="1">Schedule Post</button>
        </div>
      </article><article class="cs-pub-social-card">
        <div class="cs-pub-social-top">
          <div class="cs-pub-brand">
            <span class="cs-pub-icon"><i class="ti ti-brand-facebook"></i></span>
            <div>
              <div class="cs-pub-name">Facebook</div>
              <div class="cs-pub-sub">Distribution channel ready</div>
            </div>
          </div>
          <span class="cs-pub-status connected">Connected</span>
        </div>
        <div class="cs-pub-social-status" id="csSocialStatusText-2"><i class="ti ti-circle-check"></i> Distribution schedule active</div>
        <label class="cs-pub-toggle"><input type="checkbox"  data-social-check-idx="2"> Schedule toggle</label>
        <div class="cs-pub-input-grid">
          <input class="cs-pub-input" type="date" value="2026-07-05" id="csSocialDate-2">
          <input class="cs-pub-input" type="time" value="13:15" id="csSocialTime-2">
        </div>
        <div class="cs-pub-card-actions">
          <button class="cs-btn secondary" type="button" data-social-pub-now-idx="2">Publish Now</button>
          <button class="cs-btn primary" type="button" data-social-sched-idx="2">Schedule Post</button>
        </div>
      </article><article class="cs-pub-social-card">
        <div class="cs-pub-social-top">
          <div class="cs-pub-brand">
            <span class="cs-pub-icon"><i class="ti ti-brand-instagram"></i></span>
            <div>
              <div class="cs-pub-name">Instagram</div>
              <div class="cs-pub-sub">Distribution channel ready</div>
            </div>
          </div>
          <span class="cs-pub-status connected">Connected</span>
        </div>
        <div class="cs-pub-social-status" id="csSocialStatusText-3"><i class="ti ti-circle-check"></i> Distribution schedule active</div>
        <label class="cs-pub-toggle"><input type="checkbox" checked data-social-check-idx="3"> Schedule toggle</label>
        <div class="cs-pub-input-grid">
          <input class="cs-pub-input" type="date" value="2026-07-06" id="csSocialDate-3">
          <input class="cs-pub-input" type="time" value="18:00" id="csSocialTime-3">
        </div>
        <div class="cs-pub-card-actions">
          <button class="cs-btn secondary" type="button" data-social-pub-now-idx="3">Publish Now</button>
          <button class="cs-btn primary" type="button" data-social-sched-idx="3">Schedule Post</button>
        </div>
      </article></div>
        </div>
      </section>

      <section class="cs-card">
        <div class="cs-card-head">
          <div>
            <h2>Publishing Calendar</h2>
            <p class="cs-card-sub">Track drafts, scheduled posts, published items, and upcoming content inside a monthly calendar view.</p>
          </div>
          <div class="cs-pub-calendar-meta">
            <span class="cs-pill"><strong>Month</strong> July 2026</span>
            <span class="cs-pill"><strong>Events</strong> Scheduled, drafts, published, upcoming</span>
          </div>
        </div>
        <div class="cs-card-body cs-pub-calendar-panel">
          <div class="cs-pub-calendar-head">
            <div class="cs-pub-legend">
              <span class="cs-pub-legend-item"><span class="cs-pub-legend-dot" style="background:#6F4EF6;"></span>Scheduled posts</span>
              <span class="cs-pub-legend-item"><span class="cs-pub-legend-dot" style="background:#CBD5E1;"></span>Drafts</span>
              <span class="cs-pub-legend-item"><span class="cs-pub-legend-dot" style="background:#1C9C72;"></span>Published content</span>
              <span class="cs-pub-legend-item"><span class="cs-pub-legend-dot" style="background:#D97706;"></span>Upcoming scheduled content</span>
            </div>
          </div>
          <div class="cs-pub-weekdays">
            <div class="cs-pub-weekday">Mon</div><div class="cs-pub-weekday">Tue</div><div class="cs-pub-weekday">Wed</div><div class="cs-pub-weekday">Thu</div><div class="cs-pub-weekday">Fri</div><div class="cs-pub-weekday">Sat</div><div class="cs-pub-weekday">Sun</div>
          </div>
          <div class="cs-pub-month-grid" id="csCalendarGridContainer"><div class="cs-pub-day is-muted">
        <span class="cs-pub-day-num">30</span>
        <div class="cs-pub-event scheduled">
          <span class="cs-pub-event-meta">WordPress · 09:00</span>
          <span class="cs-pub-event-title">AI Workflow Guide</span>
        </div>
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">1</span>
        <div class="cs-pub-event scheduled">
          <span class="cs-pub-event-meta">LinkedIn · 11:00</span>
          <span class="cs-pub-event-title">Demo CTA launch</span>
        </div>
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">2</span>
        
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">3</span>
        <div class="cs-pub-event draft">
          <span class="cs-pub-event-meta">Shopify · 14:30</span>
          <span class="cs-pub-event-title">Product story update</span>
        </div>
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">4</span>
        
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">5</span>
        <div class="cs-pub-event published">
          <span class="cs-pub-event-meta">X · 08:45</span>
          <span class="cs-pub-event-title">AI visibility thread</span>
        </div>
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">6</span>
        <div class="cs-pub-event upcoming">
          <span class="cs-pub-event-meta">Webflow · 16:00</span>
          <span class="cs-pub-event-title">Webflow blog refresh</span>
        </div>
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">7</span>
        
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">8</span>
        <div class="cs-pub-event scheduled">
          <span class="cs-pub-event-meta">Newsletter · 10:00</span>
          <span class="cs-pub-event-title">Weekly distribution digest</span>
        </div>
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">9</span>
        
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">10</span>
        <div class="cs-pub-event draft">
          <span class="cs-pub-event-meta">Knowledge Base · 13:00</span>
          <span class="cs-pub-event-title">Implementation FAQ</span>
        </div>
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">11</span>
        
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">12</span>
        <div class="cs-pub-event scheduled">
          <span class="cs-pub-event-meta">Instagram · 18:00</span>
          <span class="cs-pub-event-title">Carousel teaser</span>
        </div>
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">13</span>
        
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">14</span>
        
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">15</span>
        <div class="cs-pub-event published">
          <span class="cs-pub-event-meta">WordPress · 09:30</span>
          <span class="cs-pub-event-title">Local SEO workflow post</span>
        </div>
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">16</span>
        
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">17</span>
        <div class="cs-pub-event upcoming">
          <span class="cs-pub-event-meta">Blog · 15:00</span>
          <span class="cs-pub-event-title">Case study rollout</span>
        </div>
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">18</span>
        
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">19</span>
        
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">20</span>
        <div class="cs-pub-event scheduled">
          <span class="cs-pub-event-meta">Facebook · 12:30</span>
          <span class="cs-pub-event-title">Feature announcement</span>
        </div>
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">21</span>
        
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">22</span>
        <div class="cs-pub-event draft">
          <span class="cs-pub-event-meta">Documentation · 11:15</span>
          <span class="cs-pub-event-title">Docs revision batch</span>
        </div>
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">23</span>
        
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">24</span>
        
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">25</span>
        <div class="cs-pub-event scheduled">
          <span class="cs-pub-event-meta">Webflow · 17:30</span>
          <span class="cs-pub-event-title">Design system blog</span>
        </div>
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">26</span>
        
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">27</span>
        <div class="cs-pub-event upcoming">
          <span class="cs-pub-event-meta">Shopify · 10:45</span>
          <span class="cs-pub-event-title">Collection spotlight</span>
        </div>
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">28</span>
        
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">29</span>
        <div class="cs-pub-event published">
          <span class="cs-pub-event-meta">LinkedIn · 09:15</span>
          <span class="cs-pub-event-title">Thought leadership post</span>
        </div>
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">30</span>
        
      </div><div class="cs-pub-day">
        <span class="cs-pub-day-num">31</span>
        <div class="cs-pub-event scheduled">
          <span class="cs-pub-event-meta">Newsletter · 08:30</span>
          <span class="cs-pub-event-title">Month-end recap</span>
        </div>
      </div><div class="cs-pub-day is-muted">
        <span class="cs-pub-day-num">1</span>
        
      </div><div class="cs-pub-day is-muted">
        <span class="cs-pub-day-num">2</span>
        
      </div><div class="cs-pub-day is-muted">
        <span class="cs-pub-day-num">3</span>
        
      </div></div>
        </div>
      </section>

      <section class="cs-card">
        <div class="cs-card-head">
          <div>
            <h2>Approval Workflow</h2>
            <p class="cs-card-sub">Move content from draft to published with visible workflow stages, owners, and action states.</p>
          </div>
        </div>
        <div class="cs-card-body">
          <div class="cs-pub-flow" id="csWorkflowContainer"><article class="cs-pub-stage">
        <div class="cs-pub-stage-top">
          <div class="cs-pub-stage-label">Draft</div>
          <span class="cs-pub-status pending">Ready for review</span>
        </div>
        <div class="cs-pub-stage-state"><span class="cs-pub-stage-dot" style="background:#D97706"></span>Ready for review</div>
        <div class="cs-pub-stage-copy">
          <div><strong>Assigned reviewer</strong><br>Maya Chen</div>
          <div><strong>Timestamp</strong><br>Today, 08:15 AM</div>
        </div>
        <div class="cs-pub-stage-actions"><button class="cs-btn secondary" type="button" data-workflow-idx="0">Request Approval</button></div>
      </article><article class="cs-pub-stage">
        <div class="cs-pub-stage-top">
          <div class="cs-pub-stage-label">Review</div>
          <span class="cs-pub-status review">In Review</span>
        </div>
        <div class="cs-pub-stage-state"><span class="cs-pub-stage-dot" style="background:#6F4EF6"></span>In Review</div>
        <div class="cs-pub-stage-copy">
          <div><strong>Assigned reviewer</strong><br>Aarav Patel</div>
          <div><strong>Timestamp</strong><br>Today, 10:30 AM</div>
        </div>
        <div class="cs-pub-stage-actions"><button class="cs-btn primary" type="button" data-workflow-idx="1">Approve</button></div>
      </article><article class="cs-pub-stage">
        <div class="cs-pub-stage-top">
          <div class="cs-pub-stage-label">Approved</div>
          <span class="cs-pub-status connected">Approved</span>
        </div>
        <div class="cs-pub-stage-state"><span class="cs-pub-stage-dot" style="background:#1C9C72"></span>Approved</div>
        <div class="cs-pub-stage-copy">
          <div><strong>Assigned reviewer</strong><br>Sofia Miller</div>
          <div><strong>Timestamp</strong><br>Today, 12:15 PM</div>
        </div>
        <div class="cs-pub-stage-actions"><button class="cs-btn secondary" type="button" data-workflow-idx="2">Reject</button></div>
      </article><article class="cs-pub-stage">
        <div class="cs-pub-stage-top">
          <div class="cs-pub-stage-label">Scheduled</div>
          <span class="cs-pub-status review">Scheduled</span>
        </div>
        <div class="cs-pub-stage-state"><span class="cs-pub-stage-dot" style="background:#6F4EF6"></span>Scheduled</div>
        <div class="cs-pub-stage-copy">
          <div><strong>Assigned reviewer</strong><br>Auto Scheduler</div>
          <div><strong>Timestamp</strong><br>Tomorrow, 09:00 AM</div>
        </div>
        <div class="cs-pub-stage-actions"><button class="cs-btn primary" type="button" data-workflow-idx="3">Publish</button></div>
      </article><article class="cs-pub-stage">
        <div class="cs-pub-stage-top">
          <div class="cs-pub-stage-label">Published</div>
          <span class="cs-pub-status connected">Published</span>
        </div>
        <div class="cs-pub-stage-state"><span class="cs-pub-stage-dot" style="background:#1C9C72"></span>Published</div>
        <div class="cs-pub-stage-copy">
          <div><strong>Assigned reviewer</strong><br>Publishing Bot</div>
          <div><strong>Timestamp</strong><br>Fri, 03:00 PM</div>
        </div>
        <div class="cs-pub-stage-actions"><button class="cs-btn soft" type="button" data-workflow-idx="4">Publish</button></div>
      </article></div>
        </div>
      </section>

      <section class="cs-split">
        <article class="cs-card">
          <div class="cs-card-head">
            <div>
              <h2>Publishing Queue</h2>
              <p class="cs-card-sub">Queued distribution tasks with platform mix, schedule details, status, and priority.</p>
            </div>
            <div class="cs-pill"><strong>Queue</strong> 3 content items ready for action</div>
          </div>
          <div class="cs-card-body">
            <div class="cs-pub-queue-grid" id="csQueueContainer"><article class="cs-pub-queue-card">
        <div class="cs-pub-queue-top">
          <div class="cs-pub-queue-title">
            <div class="cs-pub-name">AI content workflows for local SEO teams</div>
            <div class="cs-pub-sub">Content distribution package</div>
          </div>
          <span class="cs-badge progress">Scheduled</span>
        </div>
        <div class="cs-pub-taglist"><span class="cs-pub-tag">WordPress</span><span class="cs-pub-tag">Blog</span><span class="cs-pub-tag">Newsletter</span></div>
        <div class="cs-pub-queue-meta">
          <div class="cs-pub-meta-row"><span>Scheduled date</span><strong>July 3, 2026 · 09:00 AM</strong></div>
          <div class="cs-pub-meta-row"><span>Priority</span><strong>High</strong></div>
        </div>
        <div class="cs-pub-card-actions">
          <button class="cs-btn secondary" type="button" onclick="toast('Draft opened for editing','ok')">Edit</button>
          <button class="cs-btn primary" type="button" data-queue-pub-idx="0">Publish Now</button>
        </div>
      </article><article class="cs-pub-queue-card">
        <div class="cs-pub-queue-top">
          <div class="cs-pub-queue-title">
            <div class="cs-pub-name">Citationly feature launch recap</div>
            <div class="cs-pub-sub">Content distribution package</div>
          </div>
          <span class="cs-badge pending">Pending Approval</span>
        </div>
        <div class="cs-pub-taglist"><span class="cs-pub-tag">LinkedIn</span><span class="cs-pub-tag">X</span><span class="cs-pub-tag">Facebook</span></div>
        <div class="cs-pub-queue-meta">
          <div class="cs-pub-meta-row"><span>Scheduled date</span><strong>July 4, 2026 · 11:00 AM</strong></div>
          <div class="cs-pub-meta-row"><span>Priority</span><strong>Medium</strong></div>
        </div>
        <div class="cs-pub-card-actions">
          <button class="cs-btn secondary" type="button" onclick="toast('Draft opened for editing','ok')">Edit</button>
          <button class="cs-btn primary" type="button" data-queue-pub-idx="1">Publish Now</button>
        </div>
      </article><article class="cs-pub-queue-card">
        <div class="cs-pub-queue-top">
          <div class="cs-pub-queue-title">
            <div class="cs-pub-name">Local SEO implementation FAQ cluster</div>
            <div class="cs-pub-sub">Content distribution package</div>
          </div>
          <span class="cs-badge ready">Ready</span>
        </div>
        <div class="cs-pub-taglist"><span class="cs-pub-tag">Knowledge Base</span><span class="cs-pub-tag">Documentation</span><span class="cs-pub-tag">Webflow</span></div>
        <div class="cs-pub-queue-meta">
          <div class="cs-pub-meta-row"><span>Scheduled date</span><strong>July 6, 2026 · 02:00 PM</strong></div>
          <div class="cs-pub-meta-row"><span>Priority</span><strong>High</strong></div>
        </div>
        <div class="cs-pub-card-actions">
          <button class="cs-btn secondary" type="button" onclick="toast('Draft opened for editing','ok')">Edit</button>
          <button class="cs-btn primary" type="button" data-queue-pub-idx="2">Publish Now</button>
        </div>
      </article></div>
          </div>
        </article>

        <aside class="cs-card">
          <div class="cs-card-head">
            <div>
              <h2>Recent Publishing Activity</h2>
              <p class="cs-card-sub">Latest publishing, scheduling, and update events across all connected destinations.</p>
            </div>
          </div>
          <div class="cs-card-body">
            <div class="cs-pub-activity"><div class="cs-pub-activity-row">
        <div class="cs-pub-activity-icon"><i class="ti ti-brand-wordpress"></i></div>
        <div class="cs-pub-activity-body">
          <div class="cs-pub-activity-title">Published to WordPress</div>
          <div class="cs-pub-activity-meta">AI content workflows for local SEO teams · by Maya Chen</div>
        </div>
        <div class="cs-pub-activity-side">
          <div class="cs-pub-activity-time">09:18 AM</div>
          <span class="cs-badge ready">Published</span>
        </div>
      </div><div class="cs-pub-activity-row">
        <div class="cs-pub-activity-icon"><i class="ti ti-brand-linkedin"></i></div>
        <div class="cs-pub-activity-body">
          <div class="cs-pub-activity-title">Scheduled LinkedIn post</div>
          <div class="cs-pub-activity-meta">Feature-led teaser campaign · by Aarav Patel</div>
        </div>
        <div class="cs-pub-activity-side">
          <div class="cs-pub-activity-time">Yesterday · 05:42 PM</div>
          <span class="cs-badge progress">Scheduled</span>
        </div>
      </div><div class="cs-pub-activity-row">
        <div class="cs-pub-activity-icon"><i class="ti ti-shopping-bag"></i></div>
        <div class="cs-pub-activity-body">
          <div class="cs-pub-activity-title">Shopify article updated</div>
          <div class="cs-pub-activity-meta">Collection story refresh · by Sofia Miller</div>
        </div>
        <div class="cs-pub-activity-side">
          <div class="cs-pub-activity-time">Yesterday · 02:16 PM</div>
          <span class="cs-badge ready">Published</span>
        </div>
      </div><div class="cs-pub-activity-row">
        <div class="cs-pub-activity-icon"><i class="ti ti-layout-dashboard"></i></div>
        <div class="cs-pub-activity-body">
          <div class="cs-pub-activity-title">Webflow blog published</div>
          <div class="cs-pub-activity-meta">Design system distribution post · by Publishing Bot</div>
        </div>
        <div class="cs-pub-activity-side">
          <div class="cs-pub-activity-time">Mon · 11:05 AM</div>
          <span class="cs-badge ready">Published</span>
        </div>
      </div><div class="cs-pub-activity-row">
        <div class="cs-pub-activity-icon"><i class="ti ti-brand-facebook"></i></div>
        <div class="cs-pub-activity-body">
          <div class="cs-pub-activity-title">Facebook post scheduled</div>
          <div class="cs-pub-activity-meta">Awareness campaign asset · by Liam Ross</div>
        </div>
        <div class="cs-pub-activity-side">
          <div class="cs-pub-activity-time">Mon · 09:12 AM</div>
          <span class="cs-badge progress">Scheduled</span>
        </div>
      </div></div>
          </div>
        </aside>
      </section>
    </div></div>` }} />;
    }