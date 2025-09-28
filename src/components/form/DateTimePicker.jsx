import { 
  formatDateForInput, 
  formatTimeForInput, 
  formatDateForDisplay, 
  formatTimeForDisplay 
} from '../../utils/dateUtils';
import '../../styles/components/date-time-picker.css';

const DateTimePicker = ({ 
  useCustomDate, 
  setUseCustomDate, 
  customDate, 
  setCustomDate,
  useCustomTime,
  setUseCustomTime,
  customTime,
  setCustomTime
}) => {
  // Convert display date to input format for HTML date input
  const dateInputValue = customDate ? formatDateForInput(new Date(customDate)) : formatDateForInput();
  
  // Convert display time to input format for HTML time input
  const timeInputValue = customTime || formatTimeForInput();
  
  const handleDateChange = (e) => {
    // Convert from input format to display format when saving
    const inputDate = e.target.value;
    const displayDate = formatDateForDisplay(inputDate);
    setCustomDate(displayDate);
  };
  
  const handleTimeChange = (e) => {
    // Convert from input format to display format when saving
    const inputTime = e.target.value;
    const displayTime = formatTimeForDisplay(inputTime);
    setCustomTime(displayTime);
  };
  
  return (
    <>
      {/* Date Options */}
      <div className="form-group">
        <div className="form-checkbox-group">
          <input
            id="use-custom-date"
            type="checkbox"
            className="form-checkbox"
            checked={useCustomDate}
            onChange={() => setUseCustomDate(!useCustomDate)}
          />
          <label htmlFor="use-custom-date">Set specific date</label>
        </div>
        
        {useCustomDate && (
          <div className="form-date-time">
            <input
              type="date"
              className="form-date-time-input"
              value={dateInputValue}
              onChange={handleDateChange}
              min={formatDateForInput()}
            />
          </div>
        )}
      </div>
      
      {/* Time Options */}
      <div className="form-group">
        <div className="form-checkbox-group">
          <input
            id="use-custom-time"
            type="checkbox"
            className="form-checkbox"
            checked={useCustomTime}
            onChange={() => setUseCustomTime(!useCustomTime)}
          />
          <label htmlFor="use-custom-time">Set specific time (default: current time)</label>
        </div>
        
        {useCustomTime && (
          <div className="form-date-time">
            <input
              type="time"
              className="form-date-time-input"
              value={timeInputValue}
              onChange={handleTimeChange}
              defaultValue={formatTimeForInput()}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default DateTimePicker;