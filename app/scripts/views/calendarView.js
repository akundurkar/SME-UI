/*global define*/

define(['moment',
        'jquery',
        'jqueryfullcalendar',
        '../models/commonModel',
        '../collections/commonCollection',        
        'text!../templates/calendar.html'
        
], function (M1,$,F1,
		CommonModel,
		CommonCollection,
		calendarTemplate) {
	
  var CalendarView = Backbone.View.extend({
	  
    events: {
    	
    	
    },

    initialize: function () {
    	this.commonCollection = new CommonCollection();
    	this.calendarCollection = new CommonCollection();
    },
    
    
    getTodaysCalendarAppointments:function(){

		  
	  	var me = this;
	  	
		me.calendarCollection.url = CommonUtils.get("projectUrl")+"/rest/booking/getDashBoardDetails?branchId="+CommonUtils.getBranch("branchId");
		
		console.log("DashBoard collection"+me.dashBoardCollection);
					
		me.calendarCollection.fetch({
			  
				cache:false,
		   
				success: function (model, response, options) {			    	
		    	
							me.renderCalendar();
  		
				},error:function(model, xhr, options){
  		
							me.renderUsersNotFoundTemplate();  	
				}
				
		});
		

    },
    
    renderCalendar:function(){
    	var me = this;
    
   	 var renderData = {					   		   
    		 errorMsg:"Error Message"
      }; 
   	 
	 $("#showADMain").html($(this.el).html(_.template(calendarTemplate)));
	 
	 "use strict";
		
	    var date = new Date();
	    var d = date.getDate();
	    var m = date.getMonth();
	    var y = date.getFullYear();
	
	    var hdr = {
	        left: 'title',
	        center: 'agendaDay,month,agendaWeek',
	        right: 'prev,today,next'
	    };
	    
	    /* initialize the calendar
		 -----------------------------------------------------------------*/
	    var eventList = [];
	    
	    this.calendarCollection.each(function(order) {
            console.log('order item.', order);
            var orederStatus =order.get("orderStatus");
            var flag;
            var event;
            if (orederStatus=="BOOKED"){
	            event = {
	            title: order.get("clientName")+" "+order.get("clientlastname")+" "+order.get("orderStatus"), 
	            className: ["event", "bg-color-orange"],
	            start: new Date(order.get("date")),
	            allDay: false,
	            resourceId: 1};
	            flag=true;
            }
         
            else if (orederStatus=="CONFIRMED"){
	            event = {
	            title: order.get("clientName")+" "+order.get("clientlastname")+" "+order.get("orderStatus"), 
	            className: ["event", "bg-color-darken"],
	            start: new Date(order.get("date")),
	            allDay: false,
	            resourceId: 1};
	            flag=true;
            }
            
            else if (orederStatus=="COMPLETE"){
              	 event = {
              	            title: order.get("clientName")+" "+order.get("clientlastname")+" "+order.get("orderStatus"), 
              	            className: ["event", "bg-color-blue"],
              	            start: new Date(order.get("date")),
              	            allDay: false,
              	            resourceId: 1};
              	 flag=true;
              }
            
            else if (orederStatus=="CHECKOUT"){
              	 event = {
              	            title: order.get("clientName")+" "+order.get("clientlastname")+" "+order.get("orderStatus"), 
              	            className: ["event", "bg-color-green-light"],
              	            start: new Date(order.get("date")),
              	            allDay: false,
              	            resourceId: 1};
              	 flag=true;
              }
            else {
            	flag=false;
            }
            if (flag)
            {
            	eventList.push(event);
            	console.log(event);
            }
        });
	    
	    
	    $('#calendar').fullCalendar({
	    	
	    	defaultView: 'agendaDay',
	    	 minTime: '06:00:00',
	         maxTime: '24:00:00',
	
	        header: hdr,
	        buttonText: {
	            prev: '<i class="fa fa-chevron-left"></i>',
	            next: '<i class="fa fa-chevron-right"></i>'
	        },
	        
	        eventMouseover: function(event, jsEvent, view) {
	            if (view.name !== 'agendaDay') {
	                $(jsEvent.target).attr('title', event.title);
	            } 
	            },
	        editable: true,
	        droppable: true, // this allows things to be dropped onto the calendar !!!
	
	        drop: function (date, allDay) { // this function is called when something is dropped
	
	            // retrieve the dropped element's stored Event Object
	            var originalEventObject = $(this).data('eventObject');
	
	            // we need to copy it, so that multiple events don't have a reference to the same object
	            var copiedEventObject = $.extend({}, originalEventObject);
	
	            // assign it the date that was reported
	            copiedEventObject.start = date;
	            copiedEventObject.allDay = allDay;
	
	            // render the event on the calendar
	            // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
	            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
	
	            // is the "remove after drop" checkbox checked?
	            if ($('#drop-remove').is(':checked')) {
	                // if so, remove the element from the "Draggable Events" list
	                $(this).remove();
	            }
	
	        },
		        
	        select: function (start, end, allDay) {
	            var title = prompt('Event Title:');
	            if (title) {
	                calendar.fullCalendar('renderEvent', {
	                        title: title,
	                        start: start,
	                        end: end,
	                        allDay: allDay,
	                        resourceId : resourceId
	                    }, true // make the event "stick"
	                );
	            }
	            calendar.fullCalendar('unselect');
	        },
	
	        resources: [
	                    {
	                        id: 1,
	                        title: 'Joe Bloggs',
	                        color: 'red'
	                    },
	                    {
	                        id: 2,
	                        title: 'Alan Black',
	                        color: 'blue'
	                    },
	                    {
	                        id: 3,
	                        title: 'Robert White',
	                        color: 'pink'
	                    }

	                ],
	        
	        events: eventList,
	
	        eventRender: function (event, element, icon) {
	            if (!event.description == "") {
	                element.find('.fc-event-title').append("<br/><span class='ultra-light'>" + event.description +
	                    "</span>");
	            }
	            if (!event.icon == "") {
	                element.find('.fc-event-title').append("<i class='air air-top-right fa " + event.icon +
	                    " '></i>");
	            }
	        },
	
	        windowResize: function (event, ui) {
	            $('#calendar').fullCalendar('render');
	        }
	    });
	
	    /* hide default buttons */
	    $('.fc-header-right, .fc-header-center').hide();

	
		$('#calendar-buttons #btn-prev').click(function () {
		    $('.fc-button-prev').click();
		    return false;
		});
		
		$('#calendar-buttons #btn-next').click(function () {
		    $('.fc-button-next').click();
		    myevent = {
	            title: 'Facial- Soni',
	            start: new Date(2017, 6, 15, 10, 30),           
	            allDay: false,
	            className: ["event", "bg-color-darken"]
	        }
		    $('#calendar').fullCalendar('renderEvent', myevent);
		    return false;
		});
		
		$('#calendar-buttons #btn-today').click(function () {
		    $('.fc-button-today').click();
		    return false;
		});
		
		$('#mt').click(function () {
		    $('#calendar').fullCalendar('changeView', 'month');
		});
		
		$('#ag').click(function () {
		    $('#calendar').fullCalendar('changeView', 'agendaWeek');
		});
		
		$('#td').click(function () {
		    $('#calendar').fullCalendar('changeView', 'agendaDay');
		});
	    
		  //$('#calendar').fullCalendar('changeView', 'agendaDay')
		  
		  
	 	this.delegateEvents();

    }    
        
  });
  return CalendarView;
});
