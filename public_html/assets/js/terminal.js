TIMS();
$commands = [];
$current_command = -1;
$(document).ready(function () {
  $('.terminal-close').click(function(){
      window.close();
  });

  $('.terminal-body').keypress(function (e) {
    if(e.which === 13){
      $commands.push($('.terminal-command').last().html());
      $current_command = -1;
      $('.terminal-command').prop('contentEditable', false);
      $('.terminal-body').append('<br>');
      $('.terminal-body').append(parse_command($('.terminal-command').last().html()));
      $('.terminal-body').append('<br>');
      $('.terminal-body').append('<span class="refractor">command /></span> <div class="terminal-command" contentEditable="true"></div>');
      $('.terminal-command').last().html('');
      $('.terminal-command').focus();
      console.log($commands);
    }
  });
  
  $('.terminal-body').keydown(function (e) {
      if(e.keyCode === 38 && $commands.length > 0) {
        $('.terminal-command').focus();
        if($current_command === -1) { 
          $('.terminal-command').last().html($commands[$commands.length - 1]);
          $current_command = $commands.length - 1;
        } if($current_command !== -1) { 
          $('.terminal-command').last().html($commands[$current_command]);
          $current_command--;
        }
      }
  });
   
  $('.terminal-full-screen').click( function () {
    full_screen();
  });
});

function full_screen() {
  if($('.terminal').width() < $(window).width()){
      $('.terminal').css('width', '100%').css('min-height', '100%').css('top', '0').css('left', '0');
  } else
    $('.terminal').css('width', '75%').css('min-height', '75%').css('top', '12%').css('left', '12.5%');
}

function close_tab() {
  if (confirm("Really close this Terminal? Tab will be closed.")) {
    setTimeout(function(){var ww = window.open(window.location, '_self'); ww.close(); }, 100);
  }
}

function replace_cursor() {
  $('[contentEditable="true"]').on('click', function(e) {
    if(!$(this).hasClass('editing')){
      var range = rangy.createRange();
      $(this).toggleClass('editing');
      $(this).html('<span class="content-editable-wrapper">'+$(this).html()+'</span>');
      var $last = $(this).find('.content-editable-wrapper');
      if($last.length){
        range.setStartAfter($last[0]);
      }
      range.collapse(true);
      rangy.getSelection().setSingleRange(range);
    }
  }).on('blur', function(){
    $(this).toggleClass('editing');
    $(this).find('.content-editable-wrapper').children().last().unwrap();
  });
}


function parse_command(command) {
    if(command.indexOf('echo ') === 0) {
      return command.split('echo ')[1];        
    } 
    if(command === 'date') {
        return Date();
    }
    if (command === 'man') {
      return "HELP:";
    } else
      return 'Command "'+ command +'" is not reorganized!';
}

function TIMS() {
    $real = [55.3, 220.2, 63.8, 178.4, 8.2, 103.0, 68.0, 82.6, 81.5, 122.1,
             117.7, 115.5, 170.0, 264.9, 34.2, 165.8, 86.9, 33.5, 189.6, 184.9,
             115.3, 50.6, 144.1, 113.2, 144.3, 166.6, 151.5, 50.1, 53.0, 28.6,
             222.9, 154.7, 123.8, 151.2, 103.8, 24.6, 128.8, 169.0, 91.0, 205.1,
             229.8, 127.9, 126.4, 155.4, 324.2, 45.0, 126.3, 47.5, 182.4, 126.2,
             176.2, 87.1, 54.5, 210.2, 67.1, 124.4, 54.8, 213.6, 51.0, 167.2,
             45.2, 192.4, 83.2, 162.2, 57.4, 91.2, 83.0, 74.2, 90.8, 21.4,
             52.4, 57.4, 132.8, 175.9, 94.2, 165.5, 132.8, 55.9, 198.0, 38.8,
             141.5, 285.1, 153.8, 195.5, 58.3, 141.8, 142.8, 200.1, 77.6, 113.3,
             33.2, 52.7, 11.4, 312.6, 142.4, 38.3, 11.4, 118.8, 185.1, 211.1];
    console.log($real.sort(function(a, b){return a-b}));
    console.log(HOW_MANY_IN_INTERVAL($real, 8, 43));
    console.log(HOW_MANY_IN_INTERVAL($real, 43, 78));
    console.log(HOW_MANY_IN_INTERVAL($real, 78, 113));
    console.log(HOW_MANY_IN_INTERVAL($real, 113, 148));
    console.log(HOW_MANY_IN_INTERVAL($real, 148, 183));
    console.log(HOW_MANY_IN_INTERVAL($real, 183, 218));
    console.log(HOW_MANY_IN_INTERVAL($real, 218, 253));
    console.log(HOW_MANY_IN_INTERVAL($real, 253, 288));
    console.log(HOW_MANY_IN_INTERVAL($real, 288, 325));
    
}

function HOW_MANY_IN_INTERVAL(varinants, start_interval, end_interval) {
    var HM = 0;
    varinants.forEach(function(entry) {
        if(entry > start_interval && entry <= end_interval)HM++;
    });
    return HM;
}


