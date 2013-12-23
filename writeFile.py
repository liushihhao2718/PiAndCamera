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


newFile.write(str(year)+'年')
newFile.write(str(month)+'月')
newFile.write(str(day)+'日')
newFile.write(str(hour)+'點')
newFile.write(str(minute)+'分')
newFile.write(str(second)+'秒\n')

newFile.close()
