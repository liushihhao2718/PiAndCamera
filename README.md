PiAndCamera
===========

[youtube 影片](http://www.youtube.com/watch?v=0SIx0d9gDXc)  
成員：劉士豪、李明益

	功能項目	 
	Arduino程式  
1.	透過A2腳位接收來自光敏感測器的光敏數據。  
2.	透過i2c傳送光敏數據至Raspberry Pi。  

	Python程式  
1.	透過i2c接收Arduino傳送過來的光敏數據。  
2.	判斷光敏數值是否低於門檻值，一旦低於門檻值代表有小偷入侵。  
3.	一旦小偷入侵，python程式就會下命令給Camera module，連拍小偷的臉。  
4.	同時，產生Log記錄檔，記下小偷入侵的時間。  

	Server端程式  
1.	分析 url 並導向不同功能  
2.	網頁下載檔案  
3.	讀取 .log檔案並顯示  
4.	執行系統指令( ls, 照相, 影片)  
5.	Html 網頁  

