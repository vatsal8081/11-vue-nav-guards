<template>
  it's Users
</template>

<script>
export default {

    // 3
    // many times you want to check some condation inside of component insted if in route object 
    // we can use beforeRouteEnter guard for that 
    // keep in mind there is no any diffrence between beforeEnter and beforeRouteEnter it's just that beforeRouteEnter allow us to write guard logic inside of our component at end this guard will before we enter this route of component so not even beforeCreate hook will be called hear so we can't access any property of this component gear 
    beforeRouteEnter(to, from, next){
        console.log('beforeRouteEnter', to, from);
        // console.log('name', this.name);
        next()
    },
    // also note that in console we will alwase have beforeEach then beforeEnter and then beforeRouteEnter so all this guards will alwase execute in this proprity only

    // 4
    // when many times we have same route and we have dynamic property and we just update that dynamic property vue don't detact those changes we have to watch for router object change there is also alternative for that in vue-router which is beforeRouteUpdate guard which will also be place like beforeRouteEnter in component and also have same params this will call when ever dynamic route params change so we can do some things but keep in mind when we have props: true and we plan to use component as child of other component and also as vuew page we should use watch method only because beforeRouteUpdate will not call when we use that component as child component and don't use dynamic params insted if we use prpos


    // 6
    // we also have beforeRouteLeave which will we palce in component and will triger when user will try to leave the page we can use this guard to inform user that form is still empty things like that
    beforeRouteLeave(to, from, next){
        console.log('beforeRouteLeave', to, from);
        next();
    },


    data(){
        return {
            name: 'vatsal'
        }
    }

}
</script>

<style>

</style>