import json as JSON

FileName = './src/common/MessageKeys.ts'
OutFile = './resources.json'

def parseKey( Line ):
    IgnoreMe, Key = Line.split( '=' )
    Key = Key.strip().rstrip( ';' ).rstrip(',').strip( "'" )
    return Key

with open( FileName ) as File:
    Content = File.readlines()

MessageKeys = []
for Line in Content:
    if '=' in Line and '[' not in Line:
        MessageKeys.append( parseKey( Line ) )

Output = JSON.dumps( { "messages": MessageKeys } )

with open( OutFile, 'w' ) as File:
    File.write( Output )

