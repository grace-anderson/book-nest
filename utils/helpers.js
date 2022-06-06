module.exports = {
  format_date: (date) => {
    // example date output : 5 Jun 2022
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-GB', options);
  }
};
