const filter = (obj)=> {
  if(typeof obj !== 'object' || obj == null || Object.keys(obj).length === 0) return '';
  return Object.keys(obj).reduce((o,x)=> `${o}${(o !== 'filter' ? 'and ' : ' ')}${x}='${obj[x]}' `,'filter')
};

module.exports = {
  filter
}