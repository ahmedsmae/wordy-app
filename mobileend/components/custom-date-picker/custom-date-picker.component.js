import React from 'react';
import DatePicker from 'react-native-datepicker';

const CustomDatePicker = ({ date, placeholder, onDateChange }) => {
  return (
    <DatePicker
      style={{
        width: '95%',
        height: 60,
        margin: 10,
        marginTop: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5
      }}
      date={date}
      mode="date"
      showIcon={false}
      placeholder={placeholder}
      format="YYYY-MM-DD"
      customStyles={{
        dateInput: {
          borderWidth: 0
        },
        placeholderText: {
          fontSize: 16,
          color: 'grey',
          alignSelf: 'flex-start'
        },
        dateText: {
          fontSize: 16,
          color: 'grey',
          alignSelf: 'flex-start'
        }
      }}
      onDateChange={onDateChange}
    />
  );
};

export default CustomDatePicker;
