import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  Search, 
  Filter,
  User,
  Clock,
  CheckCircle
} from 'lucide-react';
import { formatDateTime } from '../../utils/helpers';

const VendorMessagesPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - in real app this would come from Supabase
  const conversations = [
    {
      id: 1,
      customer: {
        name: 'John Doe',
        email: 'john@example.com',
        avatar: null
      },
      lastMessage: 'Is this product still available?',
      lastMessageTime: '2024-01-15T10:30:00Z',
      unread: true,
      status: 'active',
      messages: [
        {
          id: 1,
          sender: 'customer',
          message: 'Hi, I\'m interested in the wireless headphones. Are they still available?',
          timestamp: '2024-01-15T10:00:00Z'
        },
        {
          id: 2,
          sender: 'vendor',
          message: 'Hello! Yes, they are still available. We have 5 units in stock.',
          timestamp: '2024-01-15T10:15:00Z'
        },
        {
          id: 3,
          sender: 'customer',
          message: 'Is this product still available?',
          timestamp: '2024-01-15T10:30:00Z'
        }
      ]
    },
    {
      id: 2,
      customer: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        avatar: null
      },
      lastMessage: 'Thank you for the quick delivery!',
      lastMessageTime: '2024-01-14T15:45:00Z',
      unread: false,
      status: 'resolved',
      messages: [
        {
          id: 1,
          sender: 'customer',
          message: 'I received my order today. Thank you for the quick delivery!',
          timestamp: '2024-01-14T15:45:00Z'
        },
        {
          id: 2,
          sender: 'vendor',
          message: 'You\'re welcome! We\'re glad you\'re happy with your purchase. Please don\'t hesitate to reach out if you need anything else.',
          timestamp: '2024-01-14T16:00:00Z'
        }
      ]
    },
    {
      id: 3,
      customer: {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        avatar: null
      },
      lastMessage: 'Can I get a discount for bulk order?',
      lastMessageTime: '2024-01-13T09:20:00Z',
      unread: true,
      status: 'active',
      messages: [
        {
          id: 1,
          sender: 'customer',
          message: 'Hi, I\'m looking to order 20 units of your smartphone cases. Can I get a discount for bulk order?',
          timestamp: '2024-01-13T09:20:00Z'
        }
      ]
    }
  ];

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'unread' && conv.unread) ||
                         (filterStatus === 'active' && conv.status === 'active') ||
                         (filterStatus === 'resolved' && conv.status === 'resolved');

    return matchesSearch && matchesFilter;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    // In real app, this would send the message to Supabase
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const unreadCount = conversations.filter(conv => conv.unread).length;

  return (
    <div className="h-[calc(100vh-200px)] flex bg-white rounded-lg shadow-md overflow-hidden">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount} unread
              </span>
            )}
          </div>
          
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread</option>
              <option value="active">Active</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No conversations found</p>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {filteredConversations.map((conversation) => (
                <motion.div
                  key={conversation.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedConversation?.id === conversation.id
                      ? 'bg-primary-50 border border-primary-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-medium truncate ${
                          conversation.unread ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {conversation.customer.name}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {formatDateTime(conversation.lastMessageTime).split(' ')[1]}
                        </span>
                      </div>
                      
                      <p className={`text-sm truncate mt-1 ${
                        conversation.unread ? 'text-gray-900 font-medium' : 'text-gray-500'
                      }`}>
                        {conversation.lastMessage}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          conversation.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {conversation.status}
                        </span>
                        
                        {conversation.unread && (
                          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{selectedConversation.customer.name}</h3>
                  <p className="text-sm text-gray-500">{selectedConversation.customer.email}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversation.messages.map((message: any) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'vendor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'vendor'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <div className={`flex items-center justify-end mt-1 space-x-1 ${
                      message.sender === 'vendor' ? 'text-primary-100' : 'text-gray-500'
                    }`}>
                      <Clock className="h-3 w-3" />
                      <span className="text-xs">
                        {formatDateTime(message.timestamp).split(' ')[1]}
                      </span>
                      {message.sender === 'vendor' && (
                        <CheckCircle className="h-3 w-3" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
              <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorMessagesPage;