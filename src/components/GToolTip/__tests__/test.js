
const  globalRules = {
  required: value => !!value || 'Required.',
  counter: value => value.length <= 5 || 'Max 20 characters',
  email: value => {
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return pattern.test(value) || 'Invalid e-mail.'
}
}
const rules = [globalRules.counter, globalRules.required]
function validate(value){
  const errorBucket = []
  for (let i = 0 ; i < rules.length; i++ ){
    const rule = rules[i]
    const validatedValue = typeof rule === 'function' ? rule(value) : rule
    if( typeof validatedValue == 'string'){
      errorBucket.push(validatedValue)
    }
    else if(typeof validatedValue !== 'boolean'){
      alert('Something wrong with rules! Check it out!')
    }

    return errorBucket

  }
}
console.log(validate('jsfdhkahsfsasfsafsafasfsadfasfsafsafdasfdafadsf').length)
