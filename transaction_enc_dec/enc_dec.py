from Crypto.Cipher import AES
def padd(s):
  while len(s)%16 > 0:
    s+='@'
  return s

def unpadd(s,n):
  while len(s)>n:
    s=s[:-1]
  return s

obj1 = AES.new('This is a key789', AES.MODE_CBC, 'This is an IV456')
message = "7870420920 7909024332 02/05/2021 5:41:12 100"
n = len(message)
print(message)
message = padd(message)
print(message)
ciphertext = obj1.encrypt(message)
print(ciphertext)


obj2 = AES.new('This is a key789', AES.MODE_CBC, 'This is an IV456')
final = obj2.decrypt(ciphertext)
final = unpadd(final,n)
print(final)
