<%@ page import="java.io.*,java.util.*,java.net.*" %>
<% 
        try{
        		String playerResponse = request.getParameter("Data");
        		//out.println("Receive: " + playerResponse);
            
            Socket socket = new Socket("127.0.0.1", 10000);

            ObjectInputStream inS = new ObjectInputStream(socket.getInputStream());
            ObjectOutputStream outS = new ObjectOutputStream(socket.getOutputStream());
						outS.writeObject(playerResponse);
						
						String line = (String)inS.readObject();
						out.print(line);
            socket.close();
            
            
        }
        catch(java.net.ConnectException e){
				}
%>