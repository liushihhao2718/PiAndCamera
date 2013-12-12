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

while True:
#    var = input("Enter 1 - 9: ")
#    if not var:
#        continue

#    writeNumber(var)
#    print "RPI: Hi Arduino, I sent you ", var
    # sleep one second
#    time.sleep(1)

    number = readNumber()
    print "Pi Received light number from Arduino: ", number
    print
    if number > 30 :
    	subprocess.call("date")
    	#raspistill -o pict.jpg -t 2000 
		ts = int(time.time())
		print ts
		
		for x in range(10):
			 #subprocess.call(["command1", "arg1", "arg2"])
			subprocess.call(["raspistill", "-o", ts + "_" + x +".jpg", "-t", "1", "-q", "50"])
    		time.sleep(1)   # sleep 1 sec
