# -*- coding: cp950 -*-
import smbus
import time
import subprocess

# for RPI version 1, use "bus = smbus.SMBus(0)"
bus = smbus.SMBus(1)

# This is the address we setup in the Arduino Program
address = 0x04

def writeNumber(value):
    bus.write_byte(address, value)
    # bus.write_byte_data(address, 0, value)
    return -1

def readNumber():
    number = bus.read_byte(address)
    # number = bus.read_byte_data(address, 1)
    return number
def readOldLogFile():
    originalFile = open('/home/pi/PiAndCamera/haha/public/check.log', 'r')
    while True:
        i = originalFile.readline()
        if i == '':
            break
        print('original Log: ' + i)
    
    originalFile.close()
    return 0
def writeNewLogFile():
    newFile = open('/home/pi/PiAndCamera/haha/public/check.log', 'a')
    from datetime import datetime  
    now = datetime.now()  
    year = now.year  
    month = now.month  
    day = now.day  
    hour = now.hour  
    minute = now.minute  
    second= now.second

    newFile.write(str(year)+' year ')
    newFile.write(str(month)+' month ')
    newFile.write(str(day)+' date ')
    newFile.write(str(hour)+' hour ')
    newFile.write(str(minute)+' minute ')
    newFile.write(str(second)+' second\n')
    
    newFile.close()
    return 0

while True:
#    var = input("Enter 1 - 9: ")
#    if not var:
#        continue
    
    writeNumber(9999)
    print "Pi sent Arduino : 9999"
    # sleep one second
    time.sleep(1)

    number = readNumber()
    print "Pi Received light number from Arduino: ", number
    print
    if number > 100 :
        readOldLogFile()
        writeNewLogFile()
        
    	subprocess.call("date")
    	#raspistill -o pict.jpg -t 2000 
	ts = int(time.time())
	print ts
	strTS = str(ts)	
	for x in range(10):
            strX = str(x)	
	    print strTS +" have take " + strX + " photo !!!!"	
            #subprocess.call(["command1", "arg1", "arg2"])
            subprocess.call(["raspistill", "-o", strTS + "_" + strX +".jpg", "-t", "1", "-q", "50", "-w", "640", "-h", "640"])
            time.sleep(1)   # sleep 1 sec
