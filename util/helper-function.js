exports.currencySymbol = (currency) => {
    let symbol;
    switch (currency) {
      case 'Dollar':
        symbol = '$';
        break;
      case 'Pounds':
        symbol = '£';
        break;
      case 'Yen':
        symbol = '¥';
        break;
      default:
        symbol = '';
        break;
    }
    return symbol;
  };