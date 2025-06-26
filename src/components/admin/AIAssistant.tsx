import React, { useState } from 'react';
import { Bot, Zap, Router as Route, TrendingUp, FileText, Send, Shield, AlertTriangle, Thermometer } from 'lucide-react';
import { useDonations } from '../../contexts/DonationContext';

const AIAssistant: React.FC = () => {
  const { donations, getSafetyStats } = useDonations();
  const safetyStats = getSafetyStats();
  
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: 'Hello! I\'m your AI assistant with enhanced food safety capabilities. I can help you with donation prioritization, route optimization, safety assessments, and generating insights. What would you like me to help you with today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Calculate dynamic safety metrics
  const urgentSafetyItems = donations.filter(d => {
    const score = d.safetyScore || 100;
    return score < 60 && d.status !== 'Completed' && d.status !== 'Rejected';
  }).length;

  const expiringSoon = donations.filter(d => {
    const hoursUntilExpiry = (d.expiryTime.getTime() - Date.now()) / (1000 * 60 * 60);
    return hoursUntilExpiry <= 2 && hoursUntilExpiry > 0 && d.status !== 'Completed' && d.status !== 'Rejected';
  }).length;

  const temperatureRisk = donations.filter(d => {
    if (d.preparationTime && d.storageConditions !== 'cold' && d.storageConditions !== 'frozen') {
      const hoursOld = (Date.now() - d.preparationTime.getTime()) / (1000 * 60 * 60);
      return hoursOld > 4 && d.status !== 'Completed' && d.status !== 'Rejected';
    }
    return false;
  }).length;

  const aiSuggestions = [
    {
      icon: AlertTriangle,
      title: 'Critical Safety Alert',
      description: `${urgentSafetyItems} high-risk items need immediate attention`,
      action: 'Show me all high-risk food safety items that need immediate collection',
      color: 'bg-red-100 text-red-700'
    },
    {
      icon: Thermometer,
      title: 'Temperature Risk Assessment',
      description: `${temperatureRisk} items at temperature risk`,
      action: 'Analyze temperature control risks and provide safety recommendations',
      color: 'bg-orange-100 text-orange-700'
    },
    {
      icon: Zap,
      title: 'Urgent Donation Priority',
      description: `${expiringSoon} donations expire within 2 hours`,
      action: 'Show me urgent donations that expire in the next 2 hours with safety scores',
      color: 'bg-red-100 text-red-700'
    },
    {
      icon: Route,
      title: 'Safe Collection Routes',
      description: 'Generate routes prioritizing food safety',
      action: 'Create optimized pickup routes prioritizing high-risk and expiring donations',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      icon: Shield,
      title: 'Safety Compliance Report',
      description: 'Generate food safety compliance summary',
      action: 'Generate comprehensive food safety compliance report with recommendations',
      color: 'bg-green-100 text-green-700'
    },
    {
      icon: TrendingUp,
      title: 'Safety Trends Analysis',
      description: 'Analyze safety patterns and predict risks',
      action: 'Analyze food safety trends and predict potential risk patterns',
      color: 'bg-purple-100 text-purple-700'
    }
  ];

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user' as const,
      content: message,
      timestamp: new Date()
    };

    // Simulate AI response
    const aiResponse = {
      type: 'ai' as const,
      content: generateAIResponse(message),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, aiResponse]);
    setInputMessage('');
  };

  const generateAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('high-risk') || lowerMessage.includes('safety items')) {
      const highRiskItems = donations.filter(d => {
        const score = d.safetyScore || 100;
        return score < 60 && d.status !== 'Completed' && d.status !== 'Rejected';
      });
      
      return `🚨 **Critical Food Safety Alert:**\n\n**High-Risk Items (${highRiskItems.length}):**\n${highRiskItems.slice(0, 3).map(d => 
        `• **${d.donor}** - ${d.foodType} (Safety Score: ${d.safetyScore}/100)\n  ⚠️ ${d.safetyAlerts?.join(', ') || 'Temperature/time concerns'}\n  📍 ${d.location}`
      ).join('\n\n')}\n\n**Immediate Actions Required:**\n1. Dispatch volunteers to highest risk items first\n2. Verify current storage conditions\n3. Document temperature readings\n4. Consider rejecting items with scores below 40`;
    }
    
    if (lowerMessage.includes('temperature') || lowerMessage.includes('risk assessment')) {
      return `🌡️ **Temperature Risk Assessment:**\n\n**Critical Temperature Issues:**\n• ${temperatureRisk} items at risk due to prolonged exposure\n• Hot food items should be collected within 4 hours\n• Cold chain items require immediate refrigerated transport\n\n**Recommendations:**\n1. Prioritize hot food collections (${donations.filter(d => d.storageConditions === 'hot').length} items)\n2. Ensure cold transport for refrigerated items (${donations.filter(d => d.storageConditions === 'cold').length} items)\n3. Reject items that have been unrefrigerated >24 hours\n4. Provide insulated containers for volunteers`;
    }
    
    if (lowerMessage.includes('urgent') || lowerMessage.includes('expire')) {
      const urgentItems = donations.filter(d => {
        const hoursUntilExpiry = (d.expiryTime.getTime() - Date.now()) / (1000 * 60 * 60);
        return hoursUntilExpiry <= 2 && hoursUntilExpiry > 0 && d.status !== 'Completed' && d.status !== 'Rejected';
      });
      
      return `⏰ **Urgent Donations with Safety Analysis:**\n\n${urgentItems.slice(0, 3).map(d => {
        const hoursLeft = Math.round((d.expiryTime.getTime() - Date.now()) / (1000 * 60 * 60) * 10) / 10;
        return `• **${d.donor}** - ${d.foodType}\n  ⏱️ ${hoursLeft}h remaining | Safety: ${d.safetyScore}/100\n  🌡️ ${d.storageConditions} storage | 📍 ${d.location}`;
      }).join('\n\n')}\n\n**Priority Collection Order:**\n1. Highest safety risk + shortest expiry time\n2. Verify food condition upon arrival\n3. Document any safety concerns`;
    }
    
    if (lowerMessage.includes('route') || lowerMessage.includes('pickup')) {
      return `🗺️ **Safety-Prioritized Collection Routes:**\n\n**Route A (Emergency - High Risk):**\n1. Corporate Cafeteria (Safety: 70/100, 1h left)\n2. Mario\'s Restaurant (Safety: 75/100, 2h left)\nTotal time: 25 minutes | **URGENT COLLECTION**\n\n**Route B (Standard Safety):**\n1. Fresh Bakery (Safety: 85/100, 12h left)\n2. Grand Event Hall (Safety: 90/100, 6h left)\nTotal time: 35 minutes\n\n**Safety Equipment Required:**\n• Insulated containers for hot items\n• Refrigerated transport for cold items\n• Temperature monitoring devices\n• Safety checklists for volunteers`;
    }
    
    if (lowerMessage.includes('compliance') || lowerMessage.includes('safety report')) {
      return `📋 **Food Safety Compliance Report:**\n\n**Overall Safety Performance:**\n• Low Risk: ${safetyStats.lowRisk} items (${Math.round((safetyStats.lowRisk / donations.length) * 100)}%)\n• Medium Risk: ${safetyStats.mediumRisk} items (${Math.round((safetyStats.mediumRisk / donations.length) * 100)}%)\n• High Risk: ${safetyStats.highRisk} items (${Math.round((safetyStats.highRisk / donations.length) * 100)}%)\n\n**Allergen Tracking:** ${safetyStats.withAllergens} items with allergen information\n\n**Recommendations:**\n1. Implement mandatory temperature logging\n2. Enhance volunteer safety training\n3. Develop allergen handling protocols\n4. Create safety scoring thresholds for auto-rejection`;
    }
    
    if (lowerMessage.includes('trend') || lowerMessage.includes('pattern')) {
      return `📊 **Food Safety Trends Analysis:**\n\n**Risk Patterns Identified:**\n• Peak risk hours: 2-4 PM (lunch surplus aging)\n• Highest risk category: Prepared meals at room temperature\n• Common issues: Temperature control, time management\n\n**Predictive Insights:**\n• 23% of donations show temperature risks\n• Friday donations have 15% higher safety scores\n• Restaurant donations need 30% faster collection\n\n**Preventive Measures:**\n1. Proactive donor education on storage\n2. Faster volunteer dispatch for high-risk items\n3. Real-time temperature monitoring alerts\n4. Seasonal safety protocol adjustments`;
    }
    
    return 'I can help you with food safety assessments, risk analysis, compliance reporting, and safety-prioritized route optimization. What specific safety concern would you like me to address?';
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputMessage);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* AI Suggestions */}
      <div className="lg:col-span-1 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">AI Safety Assistant</h3>
        {aiSuggestions.map((suggestion, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleSendMessage(suggestion.action)}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${suggestion.color}`}>
                <suggestion.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900">{suggestion.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{suggestion.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Interface */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[600px] flex flex-col">
          <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-2 rounded-lg">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">AI Safety Assistant</h3>
              <p className="text-sm text-gray-500">Smart insights, safety analysis & automation</p>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="text-sm whitespace-pre-line">{message.content}</div>
                  <div className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-primary-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleInputSubmit} className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about food safety, risk analysis, or compliance..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;