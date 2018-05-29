//This is the professors unedited js code for hte colours 

var urlBase = 'http://poopgroup6.com'; //url will be changed to whatever godaddy host url is
var extension = "php";

var userId = 0;
var firstName = "";
var lastName = "";

//create username and password
function createUser()
{
    var userPick = document.getElementById("newUser").value; //taking up the user new name. it should check if the name is not taken yet
    var password = document.getElementById("newPassword").value; //this is a varible to take the password to up. Next step is to make sure the password meet critera (at least 8 character, upper, lower, number and symbol,
    
    
    
}

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	
	document.getElementById("loginResult").innerHTML = "";
	
	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		
		var jsonObject = JSON.parse( xhr.responseText );
		
		userId = jsonObject.id;
		
		if( userId < 1 )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}
		
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

		document.getElementById("userName").innerHTML = firstName + " " + lastName;
		
		document.getElementById("loginName").value = "";
		document.getElementById("loginPassword").value = "";
		
		hideOrShow( "loggedInDiv", true);
		hideOrShow( "accessUIDiv", true);
		hideOrShow( "loginDiv", false);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
	
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";	

	hideOrShow( "loggedInDiv", false);
	hideOrShow( "accessUIDiv", false);
	hideOrShow( "loginDiv", true);
}

function hideOrShow( elementId, showState )
{
	var vis = "visible";
	var dis = "block";
	if( !showState )
	{
		vis = "hidden";
		dis = "none";
	}
	
	document.getElementById( elementId ).style.visibility = vis;
	document.getElementById( elementId ).style.display = dis;
}

function addContact()//added the contact not finished
{
    var First = document.getElementById("firstname").value;
    var Last = document.getElementById("lastname").value;
    var Nickname = document.getElementById("nickname").value;
    var Address = document.getElementById("address").value;
    
}

function addColor() //need to remove later on
{
	var newColor = document.getElementById("colorText").value;
	document.getElementById("colorAddResult").innerHTML = "";
	
	var jsonPayload = '{"color" : "' + newColor + '", "userId" : ' + userId + '}';
	var url = urlBase + '/AddColor.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}
	
}

//need to include a delete users function 
function deleteUser(primaryKey, user)
{
    
    
    
    
}

// deleting the contact
function deleteContact()
{
    
    
    
}

function ShowPass() {
    var x = document.getElementById("pswd");
    if (x.type == "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function sha1(msg) //found this online... I and just reading throught this to see if this could work.
//it have a 20 character salt added to the hash before sending this to the server
{
    function rotl(n,s)
    {
        return n<<s|n>>>32-s;
    };
    
    function tohex(i)
    {
        for(var h="", s=28;;s-=4)
        { h+=(i>>>s&0xf).toString(16);
            if(!s)
                return h;
        }
    };
    
    var H0=0x67452301, H1=0xEFCDAB89, H2=0x98BADCFE, H3=0x10325476, H4=0xC3D2E1F0, M=0x0ffffffff;
    
    var i, t, W=new Array(80), ml=msg.length, wa=new Array();
    msg += String.fromCharCode(0x80);
    
    while(msg.length%4)
        msg+=String.fromCharCode(0);
    
    for(i=0;i<msg.length;i+=4)
        wa.push(msg.charCodeAt(i)<<24|msg.charCodeAt(i+1)<<16|msg.charCodeAt(i+2)<<8|msg.charCodeAt(i+3));
    
    while(wa.length%16!=14) wa.push(0);
        wa.push(ml>>>29),wa.push((ml<<3)&M);
    
    for( var bo=0;bo<wa.length;bo+=16 ) {
        for(i=0;i<16;i++)
            W[i]=wa[bo+i];
        for(i=16;i<=79;i++)
            W[i]=rotl(W[i-3]^W[i-8]^W[i-14]^W[i-16],1);
        var A=H0, B=H1, C=H2, D=H3, E=H4;
        
        for(i=0 ;i<=19;i++)
            t=(rotl(A,5)+(B&C|~B&D)+E+W[i]+0x5A827999)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
        
        for(i=20;i<=39;i++)
            t=(rotl(A,5)+(B^C^D)+E+W[i]+0x6ED9EBA1)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
        
        for(i=40;i<=59;i++)
            t=(rotl(A,5)+(B&C|B&D|C&D)+E+W[i]+0x8F1BBCDC)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
        
        for(i=60;i<=79;i++)
            t=(rotl(A,5)+(B^C^D)+E+W[i]+0xCA62C1D6)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
        H0=H0+A&M;H1=H1+B&M;H2=H2+C&M;H3=H3+D&M;H4=H4+E&M;
    }
    return tohex(H0)+tohex(H1)+tohex(H2)+tohex(H3)+tohex(H4);
}

function searchColor() //emebbed in the html i think
{
	var srch = document.getElementById("searchText").value;
	document.getElementById("colorSearchResult").innerHTML = "";
	
	var colorList = document.getElementById("colorList");
	colorList.innerHTML = "";
	
	var jsonPayload = '{"search" : "' + srch + '"}';
	var url = urlBase + '/SearchColors.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				hideOrShow( "colorList", true );
				
				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				var jsonObject = JSON.parse( xhr.responseText );
				
				var i;
				for( i=0; i<jsonObject.results.length; i++ )
				{
					var opt = document.createElement("option");
					opt.text = jsonObject.results[i];
					opt.value = "";
					colorList.options.add(opt);
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
	
}
