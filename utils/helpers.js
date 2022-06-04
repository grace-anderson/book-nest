module.exports = {
  format_date: (date) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };

    return date.toLocaleDateString('en-GB', options);
  }
};
