# -*- coding: cp950 -*-

originalFile = open('C:/Users/aspire/Desktop/A.txt', 'r')
newFile = open('C:/Users/aspire/Desktop/A.txt', 'a')

while True:
    i = originalFile.readline()
    if i == '':
        break
    print(i)
    
originalFile.close()

from datetime import datetime  
now = datetime.now()  
year = now.year  
month = now.month  
day = now.day  
hour = now.hour  
minute = now.minute  
second= now.second


newFile.write(str(year)+'�~')
newFile.write(str(month)+'��')
newFile.write(str(day)+'��')
newFile.write(str(hour)+'�I')
newFile.write(str(minute)+'��')
newFile.write(str(second)+'��\n')

newFile.close()
