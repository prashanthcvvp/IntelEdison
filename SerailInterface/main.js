/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting

/*
    The Serial Peripheral Interface (SPI) sample application distributed within Intel® XDK IoT Edition under the IoT with Node.js Projects project creation option showcases how to communicate with SPI devices with Intel(R) IoT platforms such as Intel(R) Edison as the master device.

	This sends 4 bytes on MOSI and if connected correctly will yield a 4 buffer object with the result on MISO and print both. Connect MOSI to MISO and input should match the result
	Acceptable parameters to the SPI constructor depends on the amount of SPI buses & chip selects you have. Mraa considers every chip select on every bus to be represented by a SPI object. But 0 is always the default.
	SPI pins are 10/11/12 on an Intel(R) Edison Arduino type board.
		* Pin 10 >> SS
		* Pin 11 >> MOSI
		* Pin 12 >> MISO
		* Pin 13 >> SCK
	
    MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
    Library in C/C++ to interface with Galileo & other Intel platforms, in a structured API with port names/numbering that match compatible boards & with bindings to javascript.

    Steps for installing MRAA & UPM Library on Intel IoT Platform with IoTDevKit Linux* image and an active internet connection
    Using a ssh client: 
	    1. echo "src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf
	    2. opkg update
	    3. opkg upgrade

    Article: https://software.intel.com/en-us/node-js-templates-for-intel-xdk-iot-edition
*/

var m = require('mraa'); //require mraa

// helper function to go from hex val to decfunction char(x) { return parseInt(x, 16); }

var DC = new m.Gpio(9);
var CS = new m.Gpio(10);
DC.dir(m.DIR_OUT);
CS.dir(m.DIR_OUT);
var x = new m.Spi(0);
x.frequency(8000000);


/*var buf = new Buffer(4)
buf[0] = '0x41'
buf[1] = '0x2e'
buf[2] = '0x3e'
buf[3] = '0x4e'
var buf2 = x.write(buf);
console.log("Sent: " + buf.toString('hex') + ". Received: " + buf2.toString());*/

function writecommand(cmd){
    DC.write(0);
    CS.write(0);
    var buf = x.writeByte(cmd);
    console.log("receviced : "+buf.toString());
    CS.write(1);
}

function writedata(data){
    DC.write(1);
    CS.write(0);
    x.writeByte(data);
    CS.write(1);
}

function lcd_init(){
    writecommand(0xEF);
  writedata(0x03);
    
  writedata(0x80);
  writedata(0x02);

  writecommand(0xCF);  
  writedata(0x00); 
  writedata(0XC1); 
  writedata(0X30); 

  writecommand(0xED);  
  writedata(0x64); 
  writedata(0x03); 
  writedata(0X12); 
  writedata(0X81); 
 
  writecommand(0xE8);  
  writedata(0x85); 
  writedata(0x00); 
  writedata(0x78); 

  writecommand(0xCB);  
  writedata(0x39); 
  writedata(0x2C); 
  writedata(0x00); 
  writedata(0x34); 
  writedata(0x02); 
 
  writecommand(0xF7);  
  writedata(0x20); 

  writecommand(0xEA);  
  writedata(0x00); 
  writedata(0x00); 
 
  writecommand(0xC0);    //Power control 
  writedata(0x23);   //VRH[5:0] 
 
  writecommand(0xC1);    //Power control 
  writedata(0x10);   //SAP[2:0];BT[3:0] 
 
  writecommand(0xC5);    //VCM control 
  writedata(0x3e); 
  writedata(0x28); 
  
  writecommand(0xC7);    //VCM control2 
  writedata(0x86);  //--
 
  writecommand(0x36);    // Memory Access Control 
  writedata(0x48);

  writecommand(0x3A);    
  writedata(0x55); 
  
  writecommand(0xB1);    
  writedata(0x00);  
  writedata(0x18); 
 
  writecommand(0xB6);    // Display Function Control 
  writedata(0x08); 
  writedata(0x82);
  writedata(0x27);  
 
  writecommand(0xF2);    // 3Gamma Function Disable 
  writedata(0x00); 
 
  writecommand(0x26);    //Gamma curve selected 
  writedata(0x01); 
 
  writecommand(0xE0);    //Set Gamma 
  writedata(0x0F); 
  writedata(0x31); 
  writedata(0x2B); 
  writedata(0x0C); 
  writedata(0x0E); 
  writedata(0x08); 
  writedata(0x4E); 
  writedata(0xF1); 
  writedata(0x37); 
  writedata(0x07); 
  writedata(0x10); 
  writedata(0x03); 
  writedata(0x0E); 
  writedata(0x09); 
  writedata(0x00); 
  
  writecommand(0xE1);    //Set Gamma 
  writedata(0x00); 
  writedata(0x0E); 
  writedata(0x14); 
  writedata(0x03); 
  writedata(0x11); 
  writedata(0x07); 
  writedata(0x31); 
  writedata(0xC1); 
  writedata(0x48); 
  writedata(0x08); 
  writedata(0x0F); 
  writedata(0x0C); 
  writedata(0x31); 
  writedata(0x36); 
  writedata(0x0F); 

  writecommand(0x11);    //Exit Sleep 
  x=null;
  setTimeout(function(){},120);		
  x=new m.Spi(0);
  writecommand(0x29);    //Display on 
    console.log("success");
  
}

lcd_init();
x=null;
x=new m.Spi(0);
function sendCommand(){
      
    writecommand(0x0C);
    setTimeout(sendCommand,1000);
}
sendCommand();