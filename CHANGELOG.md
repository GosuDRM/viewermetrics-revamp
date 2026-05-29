# Changelog

All notable changes to the Viewer Metrics Chrome Extension will be documented in this file.

## [2.0.0] - 2026-05-29
### 🔐 Security
- Fixed 12 XSS vulnerabilities across the entire UI layer — all innerHTML injections now use DOMUtils.escapeHtml() for user-controlled data (channel names, usernames, descriptions, profile images, following lists, month/day stats)
- Fixed GraphQL injection in api-manager.js — channelName is now passed as a query variable instead of string interpolation
- Added DOMUtils.escapeHtml() utility in content/utils/dom-utils.js

### 🐛 Fixed
- Fixed isAuthenticated always evaluating to true due to `||` vs `??` operator bug in enhanced-data-manager.js
- Fixed parseInt truncating decimal settings values to integers (broke bot detection thresholds like 0.05, 0.10)
- Fixed archiveViewerTimeData not called before viewer deletion in 4 cleanup paths (24h inactivity, timeout, memory pressure, list size limit)
- Fixed retry mechanism never re-adding failed usernames to pendingUserInfo Set
- Fixed division by zero in creation-chart when all accounts are bots
- Fixed authenticatedNonBots going negative, producing negative percentages in stats display
- Fixed NaN propagation from unguarded authenticatedNonBots in history averages
- Fixed Math.max(...emptyArray) returning -Infinity in heatmap stats
- Fixed formatDuration showing "NaNh NaNm NaNs" for null/undefined input
- Fixed firstSeen/lastSeen showing "Invalid Date" for missing data
- Fixed formatNumber/formatBytes returning "undefined" for null input
- Fixed session history growing unbounded (capped at 1000 entries)
- Fixed cleanup interval never re-initializing after exiting analysis mode
- Fixed syncWithBackgroundData losing time tracking data on full-sync clear
- Fixed error fallback in getUserInfoGraphQL using wrong field list (standardFields vs allFields)
- Fixed makeDirectUserInfoCall bypassing rate limiter
- Fixed parseInt missing radix parameter in settings-manager.js

### 🔧 Reliability
- Stored MutationObserver reference in content.js for proper cleanup
- Added unsubscribe calls for all DataManager/SettingsManager subscriptions in destroy() methods (ui-manager, chart-manager)
- Added destroy() methods with proper listener cleanup to tab-manager and settings-ui
- Stored and cleaned up setTimeout IDs in chart-manager, viewer-detail-manager, and heatmap-chart
- Debounced heatmap retention slider updates (150ms) to prevent recursive DOM rebuilds
- Added error handling for async callbacks inside setTimeout
- Fixed unhandled promise rejection in background processQueue
- Stored and removed chrome.runtime.onMessage listener in tracking.js
- Replaced Math.max(...spread) with reduce() to prevent stack overflow on large arrays
- Unified timeout-utils formulas between module and non-module versions
- Replaced busy-wait waitForChartJS with clean Promise + timeout pattern

### ♿ Accessibility
- Added keyboard navigation (tabIndex, role, keydown Enter/Space) to viewer table rows and month filter items
- Added ARIA progressbar attributes to retention bar

### ⚡ Performance
- Replaced O(n*m) linear tick scan with O(1) Map lookup in heatmap chart
- Added null guards to api-client.js message handlers (7 locations)
- User info cache — returning viewers skip re-fetching, reducing API calls on long streams
- Reduced background polling intervals — cleanup 10s (was 15s), API status 10s (was 5s), health check 15s (was 10s)

## [0.9.951] - 2025-12-12
- Fixed event listener cleanup

## [0.9.95] - 2025-12-11
- Viewer details popup refactored to display next to viewer list
- Preliminary follower analysis implemented

## [0.9.94] - 2025-12-10
- Performance improvements
- Minor fixes

## [0.9.93] - 2025-12-09
- Export of viewer tracking data (CSV, XML, SQL, JSON)
- Export of viewer graph history data (CSV, XML, SQL, JSON)
- Session save and load functionality with analysis mode  

## [0.9.92] - 2025-12-03
- Fixed an issue with bot calculation

## [0.9.91] - 2025-12-03
- Implement concurrent batch processing for user info requests to maximize throughput
- Remove request-interceptor.js as we now use a simplified client ID that doesn't require auth token interception
- Always use simple headers (Client-Id) instead of intercepting authentication tokens
- More lenient calculation in botted months to avoid false positives
- Updated to use 2020 as base year as more bots have been brought online from that period

## [0.9.9] - 2025-11-29
- New High Churn mode for channels with short-lived bots
- Re-worked the stats display to be more intuitive
- Smooth lines now an easy toggle from main chart
- User retention and summary start configurable
- Bot duration separated from viewer duration
- Outgoing requests are now paused on stream end via auto-pause option
- Can now skip the first x minutes of main graph where calculations are still taking place
- Time buckets fixed and now includes all viewers seen

## [0.9.81] - 2025-11-24
### Fixed
- Quick fix to include all recent months in bot detection, as a new batch has been created

## [0.9.8] - 2025-11-23
### Added
- Time tracking system for viewer heatmap analysis
- Stream summary average and max
- Graph data smoothed
- Bot threshold override

## [0.9.7] - 2025-11-14
Minor fixes
Added ability to change user from tracking page
Improved viewer details popup

## [0.9.6] - 2025-11-12

### Pre-Release
