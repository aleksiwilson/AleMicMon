
            function startTime()   
            {   
                var today=new Date();//define date object 
                var yyyy = today.getFullYear();//Returns the year through the getFullYear() method of the date object  
                var MM = today.getMonth()+1;//Returns the year through the getMonth() method of the date object
                var dd = today.getDate();//Returns the year through the getDate() method of the date object  
                var hh=today.getHours();//Returns the hours via the getHours method of the date object
                var mm=today.getMinutes();//Returns the minutes via the getMinutes method of the date object 
                var ss=today.getSeconds();//Returns the seconds via the getSeconds method of the date object 
                // If the value of the minute or hour is less than 10, add 0 before its value, for example, if the time is 3:20:09 PM, it will display 15:20:09  
                MM=checkTime(MM);
                dd=checkTime(dd);
                mm=checkTime(mm);   
                ss=checkTime(ss);    
                var day; //Used to save the week (the getDay() method gets the week number)
                if(today.getDay()==0)   day   =   "Sunday" 
                if(today.getDay()==1)   day   =   "Monday" 
                if(today.getDay()==2)   day   =   "Tuesday" 
                if(today.getDay()==3)   day   =   "Wednesday" 
                if(today.getDay()==4)   day   =   "Thursday" 
                if(today.getDay()==5)   day   =   "Friday" 
                if(today.getDay()==6)   day   =   "Saturday" 
                document.getElementById('nowDateTimeSpan').innerHTML=yyyy+"-"+MM +"-"+ dd +" " + hh+":"+mm+":"+ss+"   " + day;   
                setTimeout('startTime()',1000);//Reload startTime() method every second
            }   

            function checkTime(i)   
            {   
                if (i<10){
                    i="0" + i;
                }   
                  return i;
            }  
