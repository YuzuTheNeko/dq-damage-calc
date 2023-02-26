$(function() {
    $("p").hide()
    const BaseText = $("p").html();
    
    function calculate(wep, arm, helm, skill, spell) {
      return Math.floor((wep * (0.6597 + 0.013202 * skill)*((arm+helm)*0.0028))*spell);
    }
    
    function commarize(num) {
      // Alter numbers larger than 1k
      if (num >= 1e3) {
        var units = ["k", "M", "B", "T", "qd", "Qn", "sx", "Sp", "O", "N", "de"];
  
        // Divide to get SI Unit engineering style numbers (1e3,1e6,1e9, etc)
        let unit = Math.floor((num.toFixed(0).length - 1) / 3) * 3
        // Calculate the remainder
        var num = (num / ('1e'+unit)).toFixed(2)
        var unitname = units[Math.floor(unit / 3) - 1]
  
        // output number remainder + unitname
        return num + unitname
      }
      
      return num.toLocaleString()
    }
    
    $( document ).ready( function() {
      let settings = {
        digitGroupSeparator: ',',
        maximumValue: '99999999999999999999999999',
        unformatOnSubmit: true,
        allowDecimalPadding: false,
        decimalPlaces: 0
      };
      
      new AutoNumeric('#wep', settings);
      new AutoNumeric('#hel', settings);
      new AutoNumeric('#arm', settings);
      new AutoNumeric('#skill', settings);
    });
  
  
    console.log($("p").text())
    console.log(BaseText)
    $("form button").click(function() {
      console.log("Clicc!");
      let wep = parseInt($("#wep").val().replaceAll(',', ''));
      let arm = parseInt($("#arm").val().replaceAll(',', ''));
      let helm = parseInt($("#hel").val().replaceAll(',', ''));
      let skill = parseInt($("#skill").val().replaceAll(',', ''));
      let spell = parseInt($('#spell').val().replaceAll(',', ''))
  
      const BaseDamage = calculate(wep, arm, helm, skill, spell);
      
      console.log(wep, arm, helm, skill);
      console.log(BaseDamage);
  
      let DamageArray = [];
  
      //No Inner
      DamageArray.push(BaseDamage*0.95);
      DamageArray.push(BaseDamage*1);
      DamageArray.push(BaseDamage*1.05);
  
      //With Inner
      DamageArray.push(BaseDamage*1.8*0.95);
      DamageArray.push(BaseDamage*1.8*1);
      DamageArray.push(BaseDamage*1.8*1.05);
  
      //With Enhanced Inner
      DamageArray.push(BaseDamage*1.9*0.95);
      DamageArray.push(BaseDamage*1.9*1);
      DamageArray.push(BaseDamage*1.9*1.05);

      //With double spell
      DamageArray.push(BaseDamage*2*0.95);
      DamageArray.push(BaseDamage*2*1);
      DamageArray.push(BaseDamage*2*1.05);

      //Base hit
      DamageArray.push(Math.round(BaseDamage/spell*0.95));
      DamageArray.push(Math.round(BaseDamage/spell*1));
      DamageArray.push(Math.round(BaseDamage/spell*1.05));

      const regExp = /\((\d+)\)/g;
      let text = BaseText;
      const matches = text.matchAll(regExp);
      
      console.log(text)
      console.log("Checking matches");
      for (const match of matches) {
        let toChange = commarize(DamageArray[match[1]]);
        text = text.replace(match[0], toChange);
      };
      console.log("Done matches");
  
      $("p").html(text);
      $("p").fadeIn();
  
    });
  });