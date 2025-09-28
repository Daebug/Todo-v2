import { useState, useEffect } from 'react';
import { useTasks } from '../../context/TaskContext';
import { 
  formatDateForInput, 
  formatTimeForInput, 
  formatDateForDisplay, 
  formatTimeForDisplay, 
  parseDisplayDate, 
  parseDisplayTime 
} from '../../utils/dateUtils';
import '../../styles/components/task-editor.css';

const TaskEditor = ({ task, onClose }) => {
  const { updateTask, addTask } = useTasks();
  const isNewTask = !task?.id;
  
  const [formData, setFormData] = useState({
    id: task?.id || '',
    title: task?.title || '',
    description: task?.description || '',
    date: task?.date || '',
    time: task?.time || '',
    priority: task?.priority || 'normal',
    completed: task?.completed || false,
    dateSet: task?.dateSet || false
  });
  
  // Convert display format dates to input format when initializing
  useEffect(() => {
    if (task?.date) {
      setFormData(prev => ({
        ...prev,
        dateInput: parseDisplayDate(task.date),
        timeInput: parseDisplayTime(task.time)
      }));
    }
  }, [task]);
  
  const [errors, setErrors] = useState({});
  
  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    return newErrors;
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle special cases for date and time inputs
    if (name === 'dateInput') {
      setFormData(prev => ({
        ...prev,
        dateInput: value,
        date: value ? formatDateForDisplay(value) : '',
        dateSet: !!value
      }));
    } else if (name === 'timeInput') {
      setFormData(prev => ({
        ...prev,
        timeInput: value,
        time: value ? formatTimeForDisplay(value) : ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Prepare the data to be saved
    const taskData = {
      ...formData,
      // Make sure date and time are in display format
      date: formData.dateInput ? formatDateForDisplay(formData.dateInput) : '',
      time: formData.timeInput ? formatTimeForDisplay(formData.timeInput) : ''
    };
    
    // Remove temporary input fields
    delete taskData.dateInput;
    delete taskData.timeInput;
    
    if (isNewTask) {
      addTask(taskData);
    } else {
      // Extract ID and pass updates
      const { id, ...updates } = taskData;
      updateTask(id, updates);
    }
    
    onClose();
  };
  
  return (
    <>
      <div className="task-editor-container">
        <div className="task-editor">
          <div className="task-editor-header">
            <h2>{isNewTask ? 'Add New Task' : 'Edit Task'}</h2>
            <button 
              type="button"
              className="close-button"
              onClick={onClose}
              aria-label="Close editor"
            >
              <div className="close-icon">×</div>
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">
                Task Title <span className="required">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter task title"
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <div className="error-message">{errors.title}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your task"
                rows={3}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group date-group">
                <label htmlFor="dateInput">Date</label>
                <input
                  type="date"
                  id="dateInput"
                  name="dateInput"
                  value={formData.dateInput || ''}
                  onChange={handleChange}
                  min={formatDateForInput()}
                />
              </div>
              
              <div className="form-group time-group">
                <label htmlFor="timeInput">Time</label>
                <input
                  type="time"
                  id="timeInput"
                  name="timeInput"
                  value={formData.timeInput || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          
            <div className="form-group checkbox-group">
              <label htmlFor="completed" className="checkbox-label">
                <input
                  type="checkbox"
                  id="completed"
                  name="completed"
                  checked={formData.completed}
                  onChange={handleChange}
                />
                <span>Mark as completed</span>
              </label>
            </div>
            
            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="save-button">
                {isNewTask ? 'Add Task' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="overlay" onClick={onClose}></div>
    </>
  );
};

export default TaskEditor;