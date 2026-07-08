import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InputField } from '../Components/InputFeild';
import { DateSelector } from '../Components/DateSelector';
import { Select } from '../Components/Select';
import { Button } from '../Components/Button';
import { Send, Mic, Search, Plus } from 'lucide-react';
import { submitInteraction } from '../Redux/hcpSlice';

export const Detailss = () => {
  const dispatch = useDispatch();
  const extractedData = useSelector((state) => state.hcp.extractedData);
  const loading = useSelector((state) => state.hcp.loading);

  const [hcpOptions, setHcpOptions] = useState([
    { label: 'Dr. John Doe', value: 'Dr. John Doe' }, 
    { label: 'Dr. Jane Smith', value: 'Dr. Jane Smith' }
  ]);

  const [formData, setFormData] = useState({
    hcp_name: '',
    interaction_type: '',
    interaction_date: '',
    interaction_time: '',
    attendees: '',
    topics_discussed: '',
    materials_shared: '',
    samples_distributed: '',
    sentiment: 'positive',
    outcomes: '',
    follow_up_actions: ''
  });

  useEffect(() => {
    if (extractedData) {
      if (extractedData.hcp_name && !hcpOptions.find(o => o.value.toLowerCase() === extractedData.hcp_name.toLowerCase())) {
        setHcpOptions(prev => [...prev, { label: extractedData.hcp_name, value: extractedData.hcp_name }]);
      }

      setFormData(prev => ({
        ...prev,
        hcp_name: extractedData.hcp_name || prev.hcp_name,
        interaction_type: extractedData.interaction_type?.toLowerCase() || prev.interaction_type,
        interaction_date: extractedData.interaction_date || prev.interaction_date,
        interaction_time: extractedData.interaction_time || prev.interaction_time,
        attendees: extractedData.attendees || prev.attendees,
        topics_discussed: extractedData.topics_discussed || prev.topics_discussed,
        materials_shared: extractedData.materials_shared || prev.materials_shared,
        samples_distributed: extractedData.samples_distributed || prev.samples_distributed,
        sentiment: extractedData.sentiment?.toLowerCase() || prev.sentiment,
        outcomes: extractedData.outcomes || prev.outcomes,
        follow_up_actions: extractedData.follow_up_actions || prev.follow_up_actions,
      }));
    }
  }, [extractedData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSentimentChange = (value) => {
    setFormData(prev => ({ ...prev, sentiment: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const payload = { ...formData };
    Object.keys(payload).forEach(key => {
      if (payload[key] === '') {
        payload[key] = null;
      }
    });

    try {
      await dispatch(submitInteraction(payload)).unwrap();
      alert("Interaction logged successfully!");
    } catch (error) {
      console.error("Failed to submit:", error);
      alert("Error logging interaction. Please check the required fields.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col h-[calc(100vh-2.5rem)] w-full overflow-hidden">
      <div className="mb-6 pb-4 border-b border-gray-100 flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Log HCP Interaction</h2>
          <p className="text-sm text-gray-500 mt-1">Interaction Details</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Select 
            label="HCP Name" 
            name="hcp_name"
            value={formData.hcp_name}
            onChange={handleChange}
            options={hcpOptions} 
            placeholder="Search or select HCP..."
          />
          <Select 
            label="Interaction Type" 
            name="interaction_type"
            value={formData.interaction_type}
            onChange={handleChange}
            options={[
              { label: 'In-Person', value: 'in-person' },
              { label: 'Phone', value: 'phone' },
              { label: 'Email', value: 'email' },
              { label: 'Video Call', value: 'video call' },
              { label: 'Meeting', value: 'meeting' }
            ]} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <DateSelector name="interaction_date" value={formData.interaction_date} onChange={handleChange} label="Date" />
          <InputField name="interaction_time" value={formData.interaction_time} onChange={handleChange} type="time" label="Time" />
        </div>

        <div>
          <InputField name="attendees" value={formData.attendees} onChange={handleChange} label="Attendees" placeholder="Enter names or search..." />
        </div>

        <div>
          <InputField name="topics_discussed" value={formData.topics_discussed} onChange={handleChange} type="textarea" label="Topics Discussed" placeholder="Enter key discussion points..." />
          <button className="flex items-center gap-1.5 text-sm text-blue-500 hover:text-blue-600 font-medium mt-2">
            <Mic className="w-4 h-4" />
            Summarize from Voice Note (Requires Consent)
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700">Materials Shared / Samples Distributed</h3>
          
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <InputField name="materials_shared" value={formData.materials_shared} onChange={handleChange} label="Materials Shared" placeholder="Brochures." />
            </div>
            <button className="h-12 px-4 bg-white border border-gray-200 text-gray-700 rounded-xl flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium">
              <Search className="w-4 h-4 text-blue-500" />
              Search/Add
            </button>
          </div>

          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <InputField name="samples_distributed" value={formData.samples_distributed} onChange={handleChange} label="Samples Distributed" placeholder="No samples added." />
            </div>
            <button className="h-12 px-4 bg-white border border-gray-200 text-gray-700 rounded-xl flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium">
              <Plus className="w-4 h-4 text-purple-500" />
              Add Sample
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Observed/Inferred HCP Sentiment</label>
          <div className="flex items-center gap-6 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="sentiment" value="positive" checked={formData.sentiment === 'positive'} onChange={() => handleSentimentChange('positive')} className="w-4 h-4 text-teal-600 focus:ring-teal-600" />
              <span className="text-sm text-gray-700">😀 Positive</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="sentiment" value="neutral" checked={formData.sentiment === 'neutral'} onChange={() => handleSentimentChange('neutral')} className="w-4 h-4 text-teal-600 focus:ring-teal-600" />
              <span className="text-sm text-gray-700">😐 Neutral</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="sentiment" value="negative" checked={formData.sentiment === 'negative'} onChange={() => handleSentimentChange('negative')} className="w-4 h-4 text-teal-600 focus:ring-teal-600" />
              <span className="text-sm text-gray-700">😡 Negative</span>
            </label>
          </div>
        </div>

        <div>
          <InputField name="outcomes" value={formData.outcomes} onChange={handleChange} type="textarea" label="Outcomes" placeholder="Key outcomes or agreements..." />
        </div>

        <div>
          <InputField name="follow_up_actions" value={formData.follow_up_actions} onChange={handleChange} type="textarea" label="Follow-up Actions" placeholder="What needs to be done next?" />
        </div>
      </div>

      <div className="pt-6 mt-4 border-t border-gray-100 flex gap-4 justify-end">
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          <Send className="w-4 h-4" />
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </div>
  );
};
