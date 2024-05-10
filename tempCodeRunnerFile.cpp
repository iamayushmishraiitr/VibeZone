#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define mk make_pair
#define vvll vector<vector<ll>>
#define vvc vector<vector<char>>
#define vss vector<string>
#define emp emplace
#define pb push_back
#define pf push_front
#define dq deque
#define llmn LONG_LONG_MIN
#define llmx LONG_LONG_MAX
#define umll unordered_map<ll,ll>
#define mll map<ll, ll>
#define sll set<ll>
#define usll unordered_set<ll>
#define vll vector<ll>
#define vpll vector<pair<ll, ll>>
#define pll pair<ll, ll>
#define frr(i, a, b, c) for (ll i = a; i < b; i += c)
#define fr(i, a, b) for (ll i = a; i < b; i++)
#define rfr(i, a, b) for (ll i = a; i > b; i--)
#define rrfr(i, a, b, c) for (ll i = a; i > b; i -= c)
#define fastio   ios_base::sync_with_stdio(false); cin.tie(NULL);
#define all(x) x.begin() , x.end()
const ll M = 1e9 + 7;
const ll M2 = 998244353;
ll mod(ll x)
{
    return ((x % M + M) % M);
}
 
ll mul(ll a, ll b)
{
    return mod(mod(a) * mod(b));
}
 
ll lcm(ll a, ll b)
{
    return (a * b) / (__gcd(a, b));
}
bool isPerfectSquare(long double x){
    if (x >= 0){
        long long sr = sqrt(x);
        return (sr * sr == x);
    }
    return false;
}
int msb(int n)
{
    if (n == 0)
        return 0;
 
    int msb = 0;
    n = n / 2;
    while (n != 0) {
        n = n / 2;
        msb++;
    }
 
    return (msb);
}
ll xo(ll n)
{
     ll z= n+1 ;
     if(z%4==1) return (z-1) ;
     if(z%4==2) return 1 ;
     if(z%4==3) return z ;
     else return 0 ;
}
 vll fac ;
ll  factorial(ll n){
    fac.clear();
    fac.resize(n+1);
    fac[0]=1;
    fac[1]=1;
    for (ll i=2;i<=n;i++) fac[i]=(fac[i-1]*i)%M2;
    return fac[n] ;
}
bool isprime(ll n)
{
      ll b=0 ;
      for(ll i=2 ;i*i<=n ;i++)
      {
          if(n%i==0)
          { b++ ;
          break;}
      }
      if(b) return false ;
      else return true ;
}
 void yes() {
    cout<<"YES"<<endl;
}
void no() {
    cout<<"NO"<<endl;
}
ll bpow(ll a, ll b) {
    ll res = 1;
    while (b > 0) {
        if (b & 1)
            res = (res * a);
        a = (a * a);
        b >>= 1;
    }
    return res;
}
ll msbPos(ll n)
{
    ll msb_p = -1;
    while (n)
    {
        n = n>>1ll;
        msb_p++;
    }
    return msb_p;
}
 
ll andOperator(ll x, ll y)
{
    ll res = 0; 
 
    while (x && y)
    {
       
        ll msb_p1 = msbPos(x);
        ll msb_p2 = msbPos(y);
        if (msb_p1 != msb_p2)
            break;
 
        ll msb_val =  (1ll << msb_p1);
        res = res + msb_val;
 
        x = x - msb_val;
        y = y - msb_val;
 
    }

    return res;
}
struct T{
    ll a,b,c ;
};
bool cmp(T &v1 ,T &v2)
{
     return v1.b < v2.b ;
}
void solve()
{
   ll n ;
   cin>> n ;
   vector<T> v(n) ;
   fr(i,0,n) cin>> v[i].a >> v[i].b >> v[i].c ;
sort(v.begin(),v.end(),cmp) ;
   fr(i,0,n)
   cout << v[i].a << " " << v[i].b << " " << v[i].c << endl ;
}
signed main ()
{
    fastio;
   ll t=1  ;
 // cin>> t ;
    while(t--)
    solve() ;
    return 0 ;
}