// Travel Tracker Application
const app = {
  // State
  state: {
    trips: [],
    rules: [],
    currentView: 'dashboard'
  },

  // Initialize application
  init() {
    this.loadState();
    this.setupEventListeners();
    this.render();
  },

  // LocalStorage Management
  loadState() {
    const savedTrips = localStorage.getItem('travelTracker_trips');
    const savedRules = localStorage.getItem('travelTracker_rules');
    
    if (savedTrips) {
      this.state.trips = JSON.parse(savedTrips);
    }
    if (savedRules) {
      this.state.rules = JSON.parse(savedRules);
    }
  },

  saveState() {
    localStorage.setItem('travelTracker_trips', JSON.stringify(this.state.trips));
    localStorage.setItem('travelTracker_rules', JSON.stringify(this.state.rules));
  },

  // Event Listeners
  setupEventListeners() {
    // Trip date change listeners
    const tripForm = document.getElementById('form-add-trip');
    if (tripForm) {
      const startDate = tripForm.querySelector('[name="startDate"]');
      const endDate = tripForm.querySelector('[name="endDate"]');
      
      if (startDate && endDate) {
        startDate.addEventListener('change', () => this.updateTripDuration());
        endDate.addEventListener('change', () => this.updateTripDuration());
      }
    }
  },

  // Navigation
  navigate(view) {
    // Hide all views
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    
    // Show selected view
    const viewElement = document.getElementById(`view-${view}`);
    if (viewElement) {
      viewElement.classList.add('active');
      this.state.currentView = view;
      
      // Render view-specific content
      this.renderView(view);
    }
  },

  renderView(view) {
    switch(view) {
      case 'dashboard':
        this.renderDashboard();
        break;
      case 'calendar':
        this.renderCalendar();
        break;
      case 'alerts':
        this.renderAlerts();
        break;
      case 'export':
        this.renderExport();
        break;
    }
  },

  // Modal Management
  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
    }
  },

  hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      // Reset form if exists
      const form = modal.querySelector('form');
      if (form) form.reset();
      
      // Clear rule config
      const ruleConfig = document.getElementById('rule-config');
      if (ruleConfig) ruleConfig.innerHTML = '';
    }
  },

  showAddTripModal(tripId = null) {
    if (tripId) {
      // Edit mode
      const trip = this.state.trips.find(t => t.id === tripId);
      if (!trip) return;
      
      const form = document.getElementById('form-add-trip');
      form.querySelector('[name="country"]').value = trip.country;
      form.querySelector('[name="startDate"]').value = trip.startDate;
      form.querySelector('[name="endDate"]').value = trip.endDate;
      form.querySelector('[name="purpose"]').value = trip.purpose || 'tourism';
      form.querySelector('[name="notes"]').value = trip.notes || '';
      
      // Store trip ID for update
      form.dataset.editId = tripId;
      
      // Change modal title
      document.querySelector('#modal-add-trip h3').textContent = 'Edit Trip';
      document.querySelector('#form-add-trip button[type="submit"]').textContent = 'Update Trip';
    }
    
    this.showModal('modal-add-trip');
    this.updateTripDuration();
  },

  showAddRuleModal() {
    this.showModal('modal-add-rule');
  },

  // Trip Management
  handleAddTrip(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const editId = form.dataset.editId;
    
    if (editId) {
      // Update existing trip
      const tripIndex = this.state.trips.findIndex(t => t.id === editId);
      if (tripIndex !== -1) {
        this.state.trips[tripIndex] = {
          ...this.state.trips[tripIndex],
          country: formData.get('country'),
          startDate: formData.get('startDate'),
          endDate: formData.get('endDate'),
          purpose: formData.get('purpose'),
          notes: formData.get('notes'),
          updatedAt: new Date().toISOString()
        };
      }
      
      // Reset edit mode
      delete form.dataset.editId;
      document.querySelector('#modal-add-trip h3').textContent = 'Add Trip';
      document.querySelector('#form-add-trip button[type="submit"]').textContent = 'Save Trip';
    } else {
      // Create new trip
      const trip = {
        id: this.generateId(),
        country: formData.get('country'),
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
        purpose: formData.get('purpose'),
        notes: formData.get('notes'),
        createdAt: new Date().toISOString()
      };
      
      this.state.trips.push(trip);
    }
    
    this.saveState();
    this.hideModal('modal-add-trip');
    this.render();
  },

  deleteTrip(tripId) {
    if (confirm('Are you sure you want to delete this trip?')) {
      this.state.trips = this.state.trips.filter(t => t.id !== tripId);
      this.saveState();
      this.render();
    }
  },

  updateTripDuration() {
    const form = document.getElementById('form-add-trip');
    const startDate = form.querySelector('[name="startDate"]').value;
    const endDate = form.querySelector('[name="endDate"]').value;
    const durationDiv = document.getElementById('trip-duration');
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
      
      if (days > 0) {
        durationDiv.textContent = `Duration: ${days} day${days !== 1 ? 's' : ''}`;
        durationDiv.classList.remove('text-red-600');
        durationDiv.classList.add('text-gray-600');
      } else {
        durationDiv.textContent = 'End date must be after start date';
        durationDiv.classList.remove('text-gray-600');
        durationDiv.classList.add('text-red-600');
      }
    }
  },

  // Rule Management
  handleRuleTypeChange(ruleType) {
    const configDiv = document.getElementById('rule-config');
    if (!configDiv) return;
    
    configDiv.innerHTML = this.getRuleConfigHTML(ruleType);
  },

  getRuleConfigHTML(ruleType) {
    switch(ruleType) {
      case 'schengen':
        return `
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Rule Name</label>
            <input type="text" name="ruleName" value="Schengen 90/180" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
          </div>
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p class="text-sm text-blue-800">
              <strong>Schengen 90/180 Rule:</strong> You can stay up to 90 days within any 180-day rolling window in the Schengen Area.
            </p>
          </div>
        `;
      
      case 'uk_srt':
        return `
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Rule Name</label>
            <input type="text" name="ruleName" value="UK Statutory Residence Test" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">UK Ties (select all that apply)</label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input type="checkbox" name="tie_family" class="mr-2">
                <span class="text-sm">Family tie (spouse/children in UK)</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" name="tie_accommodation" class="mr-2">
                <span class="text-sm">Accommodation tie (available UK home)</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" name="tie_work" class="mr-2">
                <span class="text-sm">Work tie (3+ hours work on 40+ days)</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" name="tie_90day" class="mr-2">
                <span class="text-sm">90-day tie (spent 90+ days in UK in either of previous 2 years)</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" name="tie_country" class="mr-2">
                <span class="text-sm">Country tie (spent more days in UK than any other country)</span>
              </label>
            </div>
          </div>
          <div>
            <label class="flex items-center">
              <input type="checkbox" name="previously_resident" class="mr-2">
              <span class="text-sm">I was UK resident in one or more of the previous 3 tax years</span>
            </label>
          </div>
        `;
      
      case 'us_spt':
        return `
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Rule Name</label>
            <input type="text" name="ruleName" value="US IRS Substantial Presence" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
          </div>
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p class="text-sm text-blue-800 mb-2">
              <strong>IRS Substantial Presence Test:</strong> 3-year weighted calculation
            </p>
            <ul class="text-xs text-blue-700 space-y-1">
              <li>• Current year: 1x days</li>
              <li>• Previous year: 1/3 days</li>
              <li>• 2 years ago: 1/6 days</li>
              <li>• Must have 31+ days in current year AND weighted total ≥ 183</li>
            </ul>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Days in USA (previous year)</label>
              <input type="number" name="previous_year_days" min="0" value="0" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Days in USA (2 years ago)</label>
              <input type="number" name="two_years_ago_days" min="0" value="0" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
            </div>
          </div>
        `;
      
      case 'uae':
        return `
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Rule Name</label>
            <input type="text" name="ruleName" value="UAE/Dubai Residency" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
          </div>
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p class="text-sm text-blue-800">
              <strong>UAE Residency:</strong> Simple 183-day rule. Stay 183+ days in a calendar year with valid residence visa = UAE resident.
            </p>
          </div>
          <div>
            <label class="flex items-center">
              <input type="checkbox" name="has_residence_visa" checked class="mr-2">
              <span class="text-sm">I have a valid UAE residence visa (Golden Visa, employment, etc.)</span>
            </label>
          </div>
        `;
      
      case 'thailand':
        return `
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Rule Name</label>
            <input type="text" name="ruleName" value="Thailand Tax Residency" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
          </div>
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p class="text-sm text-blue-800">
              <strong>Thailand 180-Day Rule:</strong> Stay 180+ days in a calendar year = Thai tax resident. Popular with DTV (Destination Thailand Visa) holders who do "border runs" at day 179.
            </p>
          </div>
        `;
      
      case 'portugal':
        return `
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Rule Name</label>
            <input type="text" name="ruleName" value="Portugal Tax Residency (NHR)" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
          </div>
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p class="text-sm text-blue-800">
              <strong>Portugal Tax Residency:</strong> 183+ days OR having a habitual residence on Dec 31. NHR regime offers 10 years of preferential tax treatment for new residents.
            </p>
          </div>
        `;
      
      case 'ireland':
        return `
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Rule Name</label>
            <input type="text" name="ruleName" value="Ireland Tax Residency" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
          </div>
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p class="text-sm text-blue-800 mb-2">
              <strong>Ireland Tax Residency:</strong> Two tests:
            </p>
            <ul class="text-xs text-blue-700 space-y-1">
              <li>• Single year: 183+ days in a tax year</li>
              <li>• Two-year: 280+ days over 2 consecutive years (30+ days each year)</li>
            </ul>
          </div>
        `;
      
      case 'singapore':
        return `
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Rule Name</label>
            <input type="text" name="ruleName" value="Singapore Tax Residency" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
          </div>
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p class="text-sm text-blue-800">
              <strong>Singapore Tax Residency:</strong> Simple 183-day rule with employment option. Stay or work 183+ days in a calendar year = Singapore tax resident.
            </p>
          </div>
        `;
      
      case 'australia':
        return `
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Rule Name</label>
            <input type="text" name="ruleName" value="Australia Tax Residency" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
          </div>
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p class="text-sm text-blue-800 mb-2">
              <strong>Australia Tax Residency:</strong> Multiple tests (resides, domicile, 183-day, super). Tax year runs July 1 - June 30.
            </p>
          </div>
        `;
      
      case 'canada':
        return `
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Rule Name</label>
            <input type="text" name="ruleName" value="Canada Tax Residency" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
          </div>
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p class="text-sm text-blue-800">
              <strong>Canada Tax Residency:</strong> Based on residential ties (home, spouse, dependents) rather than just days. 183+ days with significant ties = Canadian resident.
            </p>
          </div>
        `;
      
      case 'custom_rolling':
        return `
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Rule Name *</label>
            <input type="text" name="ruleName" required placeholder="e.g., Custom Visa Rule" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Country/Region *</label>
            <input type="text" name="country" required placeholder="e.g., Japan" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Days Allowed *</label>
              <input type="number" name="limitDays" required min="1" value="90" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Window (days) *</label>
              <input type="number" name="windowDays" required min="1" value="180" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
            </div>
          </div>
        `;
      
      default:
        return '<p class="text-gray-500">Select a rule type to configure options</p>';
    }
  },

  handleAddRule(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const ruleType = formData.get('ruleType');
    
    let rule = {
      id: this.generateId(),
      ruleType: ruleType,
      name: formData.get('ruleName') || this.getDefaultRuleName(ruleType),
      createdAt: new Date().toISOString()
    };
    
    // Add rule-specific config
    rule = this.buildRuleConfig(rule, ruleType, formData);
    
    this.state.rules.push(rule);
    this.saveState();
    this.hideModal('modal-add-rule');
    this.render();
  },

  buildRuleConfig(rule, ruleType, formData) {
    switch(ruleType) {
      case 'schengen':
        return {
          ...rule,
          periodType: 'rolling',
          countries: ['Schengen'],
          limitDays: 90,
          windowDays: 180,
          countType: 'days_allowed'
        };
      
      case 'uk_srt':
        return {
          ...rule,
          periodType: 'uk_statutory_residence',
          countries: ['UK'],
          ties: {
            family: formData.get('tie_family') === 'on',
            accommodation: formData.get('tie_accommodation') === 'on',
            work: formData.get('tie_work') === 'on',
            ninetyDay: formData.get('tie_90day') === 'on',
            country: formData.get('tie_country') === 'on'
          },
          previouslyResident: formData.get('previously_resident') === 'on'
        };
      
      case 'us_spt':
        return {
          ...rule,
          periodType: 'substantial_presence',
          countries: ['USA', 'United States'],
          previousYearDays: parseInt(formData.get('previous_year_days')) || 0,
          twoYearsAgoDays: parseInt(formData.get('two_years_ago_days')) || 0
        };
      
      case 'uae':
        return {
          ...rule,
          periodType: 'uae_residency',
          calculationPeriod: 'calendar_year',
          countries: ['UAE', 'Dubai', 'Abu Dhabi'],
          hasResidenceVisa: formData.get('has_residence_visa') === 'on'
        };
      
      case 'thailand':
        return {
          ...rule,
          periodType: 'thailand_tax_residency',
          countries: ['Thailand'],
          limitDays: 180
        };
      
      case 'portugal':
        return {
          ...rule,
          periodType: 'portugal_tax_residency',
          countries: ['Portugal']
        };
      
      case 'ireland':
        return {
          ...rule,
          periodType: 'ireland_tax_residency',
          countries: ['Ireland']
        };
      
      case 'singapore':
        return {
          ...rule,
          periodType: 'singapore_tax_residency',
          countries: ['Singapore']
        };
      
      case 'australia':
        return {
          ...rule,
          periodType: 'australia_tax_residency',
          countries: ['Australia']
        };
      
      case 'canada':
        return {
          ...rule,
          periodType: 'canadian_tax_residency',
          countries: ['Canada']
        };
      
      case 'custom_rolling':
        return {
          ...rule,
          periodType: 'rolling',
          countries: [formData.get('country')],
          limitDays: parseInt(formData.get('limitDays')),
          windowDays: parseInt(formData.get('windowDays')),
          countType: 'days_allowed'
        };
      
      default:
        return rule;
    }
  },

  getDefaultRuleName(ruleType) {
    const names = {
      'schengen': 'Schengen 90/180',
      'uk_srt': 'UK Statutory Residence',
      'us_spt': 'US IRS Substantial Presence',
      'uae': 'UAE/Dubai Residency',
      'canada': 'Canada Tax Residency',
      'australia': 'Australia Tax Residency',
      'singapore': 'Singapore Tax Residency',
      'thailand': 'Thailand Tax Residency',
      'portugal': 'Portugal Tax Residency (NHR)',
      'ireland': 'Ireland Tax Residency',
      'custom_rolling': 'Custom Rule'
    };
    return names[ruleType] || 'Tracking Rule';
  },

  deleteRule(ruleId) {
    if (confirm('Are you sure you want to delete this rule?')) {
      this.state.rules = this.state.rules.filter(r => r.id !== ruleId);
      this.saveState();
      this.render();
    }
  },

  // Rendering
  render() {
    this.renderView(this.state.currentView);
  },

  renderDashboard() {
    const hasRules = this.state.rules.length > 0;
    const emptyState = document.getElementById('empty-state');
    const statusCards = document.getElementById('status-cards');
    
    if (!hasRules) {
      emptyState.classList.remove('hidden');
      statusCards.innerHTML = '';
    } else {
      emptyState.classList.add('hidden');
      this.renderStatusCards();
    }
    
    this.renderRecentTrips();
  },

  renderStatusCards() {
    const container = document.getElementById('status-cards');
    if (!container) return;
    
    const currentDate = new Date().toISOString().split('T')[0];
    
    container.innerHTML = this.state.rules.map(rule => {
      // For now, show placeholder cards
      // TODO: Integrate calculator.js for real calculations
      const status = this.getPlaceholderStatus(rule);
      
      return `
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-bold text-gray-900">${this.getCountryFlag(rule.countries[0])} ${rule.name}</h3>
              <p class="text-sm text-gray-500">${this.getRuleTypeLabel(rule.ruleType)}</p>
            </div>
            <button onclick="app.deleteRule('${rule.id}')" class="text-gray-400 hover:text-red-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
          
          <div class="mb-4">
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gray-600">Days Used</span>
              <span class="font-medium">${status.daysUsed} / ${status.threshold}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="progress-bar-${status.color} h-2 rounded-full" style="width: ${status.percent}%"></div>
            </div>
          </div>
          
          <div class="flex items-center justify-between">
            <span class="status-${status.color} px-3 py-1 rounded-full text-sm font-medium border">
              ${status.label}
            </span>
            <span class="text-sm text-gray-600">${status.daysRemaining} days left</span>
          </div>
        </div>
      `;
    }).join('');
  },

  getPlaceholderStatus(rule) {
    try {
      // Use real calculator
      const currentDate = new Date().toISOString().split('T')[0];
      const result = calculate(rule, this.state.trips, currentDate);
      
      // Map result to display format
      let daysUsed, threshold, percent, daysRemaining, color, label;
      
      if (result.periodType === 'rolling') {
        daysUsed = result.daysInWindow;
        threshold = result.limit;
        percent = result.percentUsed;
        daysRemaining = result.daysRemaining;
        color = result.status;
      } else if (result.calculationPeriod === 'calendar_year' || result.taxYear) {
        // UAE, Thailand, or other calendar year based
        daysUsed = result.daysInUAE || result.daysInThailand || result.daysCurrentYear || result.daysInYear || 0;
        threshold = result.threshold || 183;
        percent = result.percentUsed || 0;
        daysRemaining = result.daysRemaining || 0;
        color = result.status;
      } else if (result.weightedDays !== undefined) {
        // US IRS SPT
        daysUsed = Math.round(result.weightedDays);
        threshold = 183;
        percent = Math.round((result.weightedDays / 183) * 100);
        daysRemaining = Math.max(0, 183 - Math.round(result.weightedDays));
        color = result.status;
      } else {
        // Fallback
        daysUsed = 0;
        threshold = 183;
        percent = 0;
        daysRemaining = 183;
        color = 'green';
      }
      
      // Map status to label
      const labelMap = {
        'green': 'SAFE',
        'yellow': 'CAUTION',
        'red': 'DANGER',
        'resident': 'RESIDENT'
      };
      label = labelMap[color] || 'UNKNOWN';
      
      return {
        daysUsed,
        threshold,
        percent,
        daysRemaining,
        color,
        label
      };
    } catch (error) {
      console.error('Calculation error:', error);
      // Return safe defaults on error
      return {
        daysUsed: 0,
        threshold: 90,
        percent: 0,
        daysRemaining: 90,
        color: 'green',
        label: 'ERROR'
      };
    }
  },

  renderRecentTrips() {
    const container = document.getElementById('recent-trips-list');
    if (!container) return;
    
    if (this.state.trips.length === 0) {
      container.innerHTML = '<p class="text-gray-500 text-center py-4">No trips yet. Add your first trip to start tracking.</p>';
      return;
    }
    
    const sortedTrips = [...this.state.trips].sort((a, b) => 
      new Date(b.startDate) - new Date(a.startDate)
    ).slice(0, 5);
    
    container.innerHTML = sortedTrips.map(trip => {
      const start = new Date(trip.startDate);
      const end = new Date(trip.endDate);
      const days = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
      
      return `
        <div class="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
          <div class="flex items-center space-x-3">
            <div class="text-2xl">${this.getCountryFlag(trip.country)}</div>
            <div>
              <div class="font-medium text-gray-900">${trip.country}</div>
              <div class="text-sm text-gray-500">${this.formatDate(trip.startDate)} - ${this.formatDate(trip.endDate)} (${days} day${days !== 1 ? 's' : ''})</div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button onclick="app.showAddTripModal('${trip.id}')" class="text-gray-400 hover:text-blue-600" title="Edit trip">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            <button onclick="app.deleteTrip('${trip.id}')" class="text-gray-400 hover:text-red-600" title="Delete trip">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  renderCalendar() {
    const container = document.getElementById('calendar-content');
    if (!container) return;
    
    if (this.state.trips.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12">
          <div class="text-6xl mb-4">📅</div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">No Trips Yet</h3>
          <p class="text-gray-600 mb-6">Add trips to see them visualized on the calendar</p>
          <button onclick="app.showAddTripModal()" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">
            + Add Trip
          </button>
        </div>
      `;
      return;
    }
    
    // Group trips by year and month
    const tripsByYearMonth = {};
    this.state.trips.forEach(trip => {
      const startDate = new Date(trip.startDate);
      const endDate = new Date(trip.endDate);
      
      // Create entry for each month the trip spans
      let current = new Date(startDate);
      while (current <= endDate) {
        const yearMonth = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;
        if (!tripsByYearMonth[yearMonth]) {
          tripsByYearMonth[yearMonth] = [];
        }
        
        // Check if this trip is already in this month's list
        if (!tripsByYearMonth[yearMonth].find(t => t.id === trip.id)) {
          tripsByYearMonth[yearMonth].push(trip);
        }
        
        // Move to next month
        current.setMonth(current.getMonth() + 1);
        current.setDate(1);
      }
    });
    
    // Sort year-months
    const sortedYearMonths = Object.keys(tripsByYearMonth).sort();
    
    // Render calendar
    let html = `
      <div class="mb-4">
        <h3 class="text-lg font-bold text-gray-900">Trip Timeline</h3>
        <p class="text-sm text-gray-600">Visual overview of all your trips</p>
      </div>
    `;
    
    sortedYearMonths.forEach(yearMonth => {
      const [year, month] = yearMonth.split('-');
      const monthName = new Date(year, month - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      const trips = tripsByYearMonth[yearMonth];
      
      html += `
        <div class="mb-6">
          <h4 class="text-md font-bold text-gray-700 mb-3">${monthName}</h4>
          <div class="space-y-2">
            ${trips.map(trip => {
              const start = new Date(trip.startDate);
              const end = new Date(trip.endDate);
              const days = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
              
              return `
                <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <div class="text-3xl">${this.getCountryFlag(trip.country)}</div>
                      <div>
                        <div class="font-medium text-gray-900">${trip.country}</div>
                        <div class="text-sm text-gray-500">
                          ${this.formatDate(trip.startDate)} → ${this.formatDate(trip.endDate)}
                          <span class="text-gray-400">•</span>
                          ${days} day${days !== 1 ? 's' : ''}
                        </div>
                        ${trip.purpose ? `<div class="text-xs text-gray-500 mt-1">${trip.purpose}</div>` : ''}
                      </div>
                    </div>
                    <div class="flex items-center space-x-2">
                      <button onclick="app.showAddTripModal('${trip.id}')" class="text-gray-400 hover:text-blue-600" title="Edit trip">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </button>
                      <button onclick="app.deleteTrip('${trip.id}')" class="text-gray-400 hover:text-red-600" title="Delete trip">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });
    
    container.innerHTML = html;
  },

  renderAlerts() {
    const container = document.getElementById('alerts-content');
    if (!container) return;
    
    if (this.state.rules.length === 0) {
      container.innerHTML = `
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div class="text-6xl mb-4">🔔</div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">No Rules to Monitor</h3>
          <p class="text-gray-600 mb-6">Add tracking rules to receive proactive alerts</p>
          <button onclick="app.showAddRuleModal()" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">
            + Add Rule
          </button>
        </div>
      `;
      return;
    }
    
    // Generate alerts for each rule
    const alerts = {
      critical: [],
      warning: [],
      info: []
    };
    
    const currentDate = new Date().toISOString().split('T')[0];
    
    this.state.rules.forEach(rule => {
      try {
        const result = calculate(rule, this.state.trips, currentDate);
        
        // Extract relevant metrics
        let percent = 0;
        let daysRemaining = 0;
        let status = 'green';
        
        if (result.percentUsed !== undefined) {
          percent = result.percentUsed;
          daysRemaining = result.daysRemaining || 0;
          status = result.status;
        }
        
        // Critical alerts (>90% or red status)
        if (status === 'red' || percent >= 90) {
          alerts.critical.push({
            rule: rule.name,
            message: `${percent}% of limit used (${daysRemaining} days remaining)`,
            action: daysRemaining > 0 ? 'Plan your exit carefully to avoid overstay' : 'LIMIT REACHED - Exit immediately or face penalties'
          });
        }
        // Warning alerts (66-90% or yellow status)
        else if (status === 'yellow' || percent >= 66) {
          alerts.warning.push({
            rule: rule.name,
            message: `${percent}% of limit used (${daysRemaining} days remaining)`,
            action: 'Monitor closely and plan future trips accordingly'
          });
        }
        // Info (under 66%)
        else if (status === 'green') {
          alerts.info.push({
            rule: rule.name,
            message: `${percent}% of limit used (${daysRemaining} days remaining)`,
            action: 'You have plenty of capacity'
          });
        }
        // Resident status
        else if (status === 'resident') {
          alerts.critical.push({
            rule: rule.name,
            message: 'Tax residency threshold met',
            action: 'You are considered a tax resident - consult a tax advisor'
          });
        }
      } catch (error) {
        console.error('Alert generation error:', error);
      }
    });
    
    // Render alerts
    let html = '';
    
    if (alerts.critical.length > 0) {
      html += `
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <div class="flex items-center mb-4">
            <div class="text-2xl mr-3">🔴</div>
            <h3 class="text-lg font-bold text-red-900">Critical Alerts (${alerts.critical.length})</h3>
          </div>
          <div class="space-y-4">
            ${alerts.critical.map(alert => `
              <div class="bg-white rounded-lg p-4 border border-red-200">
                <div class="font-bold text-red-900 mb-1">${alert.rule}</div>
                <div class="text-sm text-red-700 mb-2">${alert.message}</div>
                <div class="text-sm text-red-600">→ ${alert.action}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
    
    if (alerts.warning.length > 0) {
      html += `
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <div class="flex items-center mb-4">
            <div class="text-2xl mr-3">🟡</div>
            <h3 class="text-lg font-bold text-yellow-900">Warnings (${alerts.warning.length})</h3>
          </div>
          <div class="space-y-4">
            ${alerts.warning.map(alert => `
              <div class="bg-white rounded-lg p-4 border border-yellow-200">
                <div class="font-bold text-yellow-900 mb-1">${alert.rule}</div>
                <div class="text-sm text-yellow-700 mb-2">${alert.message}</div>
                <div class="text-sm text-yellow-600">→ ${alert.action}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
    
    if (alerts.info.length > 0) {
      html += `
        <div class="bg-green-50 border border-green-200 rounded-lg p-6">
          <div class="flex items-center mb-4">
            <div class="text-2xl mr-3">🟢</div>
            <h3 class="text-lg font-bold text-green-900">Status Updates (${alerts.info.length})</h3>
          </div>
          <div class="space-y-4">
            ${alerts.info.map(alert => `
              <div class="bg-white rounded-lg p-4 border border-green-200">
                <div class="font-bold text-green-900 mb-1">${alert.rule}</div>
                <div class="text-sm text-green-700 mb-2">${alert.message}</div>
                <div class="text-sm text-green-600">→ ${alert.action}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
    
    if (html === '') {
      html = '<p class="text-gray-500 text-center py-8">No alerts at this time</p>';
    }
    
    container.innerHTML = html;
  },

  renderExport() {
    const container = document.getElementById('export-content');
    if (!container) return;
    
    const tripCount = this.state.trips.length;
    const ruleCount = this.state.rules.length;
    
    container.innerHTML = `
      <div class="space-y-6">
        <div class="bg-gray-50 rounded-lg p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-2">Export Summary</h3>
          <p class="text-gray-600">
            Your data: <strong>${tripCount} trip${tripCount !== 1 ? 's' : ''}</strong> and 
            <strong>${ruleCount} rule${ruleCount !== 1 ? 's' : ''}</strong>
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- CSV Export -->
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <div class="flex items-center mb-4">
              <div class="text-3xl mr-3">📊</div>
              <div>
                <h4 class="text-lg font-bold text-gray-900">CSV Export</h4>
                <p class="text-sm text-gray-600">For advisors and spreadsheets</p>
              </div>
            </div>
            <ul class="text-sm text-gray-600 mb-6 space-y-2">
              <li>✓ All trips with dates</li>
              <li>✓ Days per country</li>
              <li>✓ Purpose and notes</li>
              <li>✓ Easy to analyze</li>
            </ul>
            <button 
              onclick="app.exportCSV()" 
              class="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 font-medium"
              ${tripCount === 0 ? 'disabled' : ''}
            >
              Download CSV
            </button>
          </div>

          <!-- PDF Export (placeholder) -->
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <div class="flex items-center mb-4">
              <div class="text-3xl mr-3">📄</div>
              <div>
                <h4 class="text-lg font-bold text-gray-900">PDF Report</h4>
                <p class="text-sm text-gray-600">For authorities and officials</p>
              </div>
            </div>
            <ul class="text-sm text-gray-600 mb-6 space-y-2">
              <li>✓ Professional formatting</li>
              <li>✓ Official documentation</li>
              <li>✓ Rule calculations</li>
              <li>✓ Ready to submit</li>
            </ul>
            <button 
              onclick="alert('PDF export coming soon!')" 
              class="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 font-medium opacity-50 cursor-not-allowed"
              disabled
            >
              Download PDF (Coming Soon)
            </button>
          </div>
        </div>

        <!-- Data Backup -->
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <div class="flex items-center mb-4">
            <div class="text-3xl mr-3">💾</div>
            <div>
              <h4 class="text-lg font-bold text-gray-900">Data Backup</h4>
              <p class="text-sm text-gray-600">Save and restore your complete tracking data</p>
            </div>
          </div>
          <div class="flex space-x-4">
            <button 
              onclick="app.exportBackup()" 
              class="flex-1 bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 font-medium"
            >
              💾 Backup Data (JSON)
            </button>
            <button 
              onclick="app.importBackup()" 
              class="flex-1 bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 font-medium"
            >
              📥 Restore Backup
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // Export Functions
  exportCSV() {
    if (this.state.trips.length === 0) {
      alert('No trips to export');
      return;
    }

    // Create CSV header
    let csv = 'Country,Start Date,End Date,Days,Purpose,Notes\n';

    // Sort trips by start date
    const sortedTrips = [...this.state.trips].sort((a, b) => 
      new Date(a.startDate) - new Date(b.startDate)
    );

    // Add trip rows
    sortedTrips.forEach(trip => {
      const start = new Date(trip.startDate);
      const end = new Date(trip.endDate);
      const days = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
      
      const row = [
        trip.country,
        trip.startDate,
        trip.endDate,
        days,
        trip.purpose || '',
        (trip.notes || '').replace(/"/g, '""') // Escape quotes
      ];
      
      csv += row.map(field => `"${field}"`).join(',') + '\n';
    });

    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `travel-tracker-trips-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  },

  exportBackup() {
    const backup = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      trips: this.state.trips,
      rules: this.state.rules
    };

    const json = JSON.stringify(backup, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `travel-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  },

  importBackup() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const backup = JSON.parse(e.target.result);
          
          if (!backup.trips || !backup.rules) {
            alert('Invalid backup file');
            return;
          }
          
          if (confirm(`This will restore ${backup.trips.length} trips and ${backup.rules.length} rules. Current data will be replaced. Continue?`)) {
            this.state.trips = backup.trips;
            this.state.rules = backup.rules;
            this.saveState();
            this.render();
            alert('Backup restored successfully!');
          }
        } catch (error) {
          alert('Error reading backup file: ' + error.message);
        }
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  },

  // Utilities
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  },

  getCountryFlag(country) {
    const flags = {
      'schengen': '🇪🇺',
      'spain': '🇪🇸',
      'france': '🇫🇷',
      'germany': '🇩🇪',
      'italy': '🇮🇹',
      'uk': '🇬🇧',
      'united kingdom': '🇬🇧',
      'usa': '🇺🇸',
      'united states': '🇺🇸',
      'uae': '🇦🇪',
      'dubai': '🇦🇪',
      'canada': '🇨🇦',
      'australia': '🇦🇺',
      'singapore': '🇸🇬',
      'thailand': '🇹🇭',
      'portugal': '🇵🇹',
      'ireland': '🇮🇪'
    };
    
    const key = country.toLowerCase();
    return flags[key] || '🌍';
  },

  getRuleTypeLabel(ruleType) {
    const labels = {
      'schengen': 'Rolling 90/180 Window',
      'uk_srt': 'Statutory Residence Test',
      'us_spt': '3-Year Weighted Calculation',
      'uae': '183-Day Calendar Year',
      'canada': 'Residential Ties System',
      'australia': 'Multi-Test System (Jul-Jun)',
      'singapore': '183-Day + Employment',
      'thailand': '180-Day Rule',
      'portugal': '183-Day + Habitual Residence',
      'ireland': 'Single/Two-Year Test',
      'custom_rolling': 'Custom Rolling Window'
    };
    return labels[ruleType] || 'Custom Rule';
  }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});