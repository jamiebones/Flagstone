

flagstone_holdings = {};

flagstone_holdings.validateEmail = function (email){
	let _re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

		if (!_re.test(email)){
			return false;
		}

		else{
			return true;
		}
};




FlagStone = {}

FlagStone.CreateGuid = function ()  {
  function _p8(s)  {
    var p = (Math.random().toString(16) + "000000000").substr(2,8);
    return s ? "_" + p.substr(0,4) + "_" + p.substr(4,4) : p;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}

