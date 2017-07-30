getHeaderColor = (type) => {
    if (type === 'fire')
        return '#d35400'
    else if (type === 'health')
        return '#2980b9'
    else 
        return '#2c3e50'
}

capitalizeFirstLetter = input => {
    return input.charAt(0).toUpperCase() + input.slice(1);
  };

export {getHeaderColor, capitalizeFirstLetter}